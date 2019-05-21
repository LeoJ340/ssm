// 页面加载玩执行
window.onload=function () {
    getData();
};
// 初始化数据列表
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
function Delete(id) {
    var isDelete=confirm("你确定删除这条记录吗？");
    if (isDelete===true) {
        $.ajax({
            url:"/user/delete.do",
            type:"post",
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
// 修改
function update() {
    var update_data = $("#update_data").serialize();

}
// 批量删除
function allDelete() {

}
// 封装渲染数据列表方法
// 前端学的很low 暂时用jquery的ajax和字符串拼接
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
            "<a class='iconfont icon-edit' data-toggle='modal'></a>" +
            "<a class='iconfont icon-delete' onclick='Delete("+response[index].id+")'></a>" +
            "</td>"+
            "</tr>"
    });
    tbody.html(content);
}