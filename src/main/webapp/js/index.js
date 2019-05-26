// 定义全局变量
var pageSize=3;
var beginIndex=1;
getPageData(beginIndex,pageSize,null);
// 分页查询
function getPageData(pageIndex,pageSize,selectParams) {
    var pageParams={
        pageIndex:pageIndex,
        pageSize:pageSize
    };
    var params = $.extend(pageParams,selectParams);
    $.ajax({
        url:"/user/userpage.do",
        type:"post",
        data:params,
        success:function (response) {
            showData(response.beanList);
            appendPage(response.pageIndex, response.totalPage, 3);
        }
    });
}
// 条件查询
function select() {
    var name = $("#name").val();
    var selectParams={
        name:name
    };
    getPageData(1,3,selectParams);
}
// 新增
function insert() {
    var insert_data = $("#insert_data").serialize();
    $.ajax({
        url:"/user/insert.do",
        type:"post",
        data:insert_data,
        success:function (response) {
            if (response.success){
                alert("添加成功！");
                getPageData(1,3);
                $('#insertModal').modal('hide');
            } else {
                alert("添加失败！");
            }
        }
    });
}
// 删除单条数据
function DeleteOne(id) {
    var isDelete=confirm("你确定删除这条记录吗？");
    if (isDelete===true) {
        $.ajax({
            url:"/user/delete.do",
            type:"post",
            async:false,
            data:{
                id:id
            },
            success:function (response) {
                if (response.success){
                    alert("删除成功！");
                    getData();
                } else {
                    alert("删除失败！");
                }
            }
        });
    }
}
// 批量删除
function allDelete() {
    var list = $("#tbody").find('input:checkbox:checked');
    var isDelete=confirm("你确定删除这"+list.length+"条记录吗？");
    if (isDelete===true) {
        var deleteRes;
        $(list).each(function (index) {
            $.ajax({
                url:"/user/delete.do",
                type:"post",
                async:false,
                data:{
                    id:list[index].value
                },
                success:function (response) {
                    deleteRes = !!response.success;
                }
            });
        });
        if (deleteRes) {
            alert("删除成功！");
            getData();
        }else {
            alert("删除失败！");
        }
    }
}
// 将数据渲染到编辑模态框中
function showUpdateModal(name,sex,age,telNumber,id) {
    $("#updateModal").modal("show");
    $("#update_data").find("input[name=id]").val(id);
    $("#update_data").find("input[name=name]").val(name);
    $("#update_data").find("input[name=sex][value="+sex+"]").attr('checked', 'checked');
    $("#update_data").find("input[name=age]").val(age);
    $("#update_data").find("input[name=telNumber]").val(telNumber);
}
// 修改
function update() {
    var update_data = "id="+$("#update_data").find("input[name=id]").val()+"&"+$("#update_data").serialize();
    $.ajax({
        url:"/user/update.do",
        type:"post",
        data:update_data,
        success:function (response) {
            if (response.success){
                alert("修改成功！");
                getData();
                $('#updateModal').modal('hide');
            } else {
                alert("修改失败！");
            }
        }
    });
}
// 封装渲染数据列表方法
function showData(response) {
    var content="";
    var tbody = $('#tbody');
    $(response).each(function (index) {
        content += "<tr>" +
            "<td>" +
            "<label>" +
            "<input type='checkbox' value='"+response[index].id+"'>" +
            "</label>" +
            "</td>"+
            "<td>"+response[index].id+"</td>"+
            "<td>"+response[index].name+"</td>"+
            "<td>"+response[index].sex+"</td>"+
            "<td>"+response[index].age+"</td>"+
            "<td>"+response[index].telNumber+"</td>"+
            "<td>" +
            "<a class=\"iconfont icon-edit\" data-toggle=\"modal\" onclick=\"showUpdateModal(\'"+response[index].name+"\',\'"+response[index].sex+"\',"+response[index].age+",\'"+response[index].telNumber+"\',"+response[index].id+")\"></a>"+
            "<a class='iconfont icon-delete' onclick='DeleteOne("+response[index].id+")'></a>" +
            "</td>"+
            "</tr>"
    });
    tbody.html(content);
}
// 拼接分页条(页码,总页数,缩进页数)
function appendPage(pageIndex, totalPage, len_size) {
    var html = '';
    // 上一页
    html += '<li class="page-item" data-option="' + (pageIndex - 1) + '">' +
        '<a class="page-link" href="javascript:void(0);" aria-label="Previous">' +
        '<span aria-hidden="true">&laquo;</span>' +
        '</a>' +
        '</li>';
    if ((pageIndex - len_size - 1) > 0) {
        html += '<li class="page-item" data-option="' + (pageIndex - len_size - 1) + '">' +
            '<a class="page-link" href="javascript:void(0);">...</a>' +
            '</li>';
    }
    for (var i = len_size; i > 0; i--) {
        if (pageIndex - i > 0) {
            html += '<li class="page-item" data-option="' + (pageIndex - i) + '">' +
                '<a class="page-link" href="javascript:void(0);">' + (pageIndex - i) + '</a>' +
                '</li>';
        }
    }
    html += '<li class="page-item active" data-option="' + pageIndex + '">' +
        '<a class="page-link" href="javascript:void(0);">' + pageIndex + '</a>' +
        '</li>';
    for (var i = 1; i <= len_size; i++) {
        if (pageIndex + i <= totalPage) {
            html += '<li class="page-item" data-option="' + (pageIndex + i) + '">' +
                '<a class="page-link" href="javascript:void(0);">' + (pageIndex + i) + '</a>' +
                '</li>';
        }
    }
    if ((pageIndex + len_size + 1) <= totalPage) {
        html += '<li class="page-item" data-option="' + (pageIndex + len_size + 1) + '">' +
            '<a class="page-link" href="javascript:void(0);">...</a>' +
            '</li>';
    }
    // 下一页
    html += '<li class="page-item" data-option="' + (pageIndex + 1) + '">' +
        '<a class="page-link" href="javascript:void(0);" aria-label="Next">' +
        '<span aria-hidden="true">&raquo;</span>' +
        '</a>' +
        '</li>';
    $("#pager").html(html);
    // 第一页时禁用上一页
    if (pageIndex === 1) {
        $("#pager li:first").addClass("disabled");
    }
    // 最后一页时禁用下一页
    if (pageIndex === totalPage) {
        $("#pager li:last").addClass("disabled");
    }
    // 分页点击事件
    $("#pager li").click(function() {
        if ($(this).hasClass('disabled') || $(this).hasClass('active')) {
            return;
        }
        getPageData($(this).attr("data-option"), pageSize,null);
    });
}
