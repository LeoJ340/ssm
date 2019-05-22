// 页面加载玩执行
window.onload=function () {
    getData();
};
// 初始化/刷新数据列表
function getData(){
    $.ajax({
        url:"/user/users.do",
        type:"post",
        success:function (response) {
            showData(response);
        }
    });
}
// 查询
function select() {
    var name = $("#name").val();
    $.ajax({
        url:"/user/users.do",
        type:"post",
        data:{
            name:name
        },
        success:function (response) {
            showData(response);
        }
    });
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
                getData();
                $('#insertModal').modal('hide');
            } else {
                alert("添加失败！");
            }
        }
    });
}
// 删除
function Delete(id) {
    $.ajax({
        url:"/user/delete.do",
        type:"post",
        async:false,
        data:{
            id:id
        },
        success:function (response) {
            return !!response.success;
        }
    });
}
// 删除单条数据
function DeleteOne(id) {
    var isDelete=confirm("你确定删除这条记录吗？");
    if (isDelete===true) {
        alert(Delete(id));
        // $.ajax({
        //     url:"/user/delete.do",
        //     type:"post",
        //     async:false,
        //     data:{
        //         id:id
        //     },
        //     success:function (response) {
        //         if (response.success){
        //             alert("删除成功！");
        //             getData();
        //         } else {
        //             alert("删除失败！");
        //         }
        //     }
        // });
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