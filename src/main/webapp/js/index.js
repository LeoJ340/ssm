window.onload=function(){
    // 前端学的很low 暂时用jquery的ajax和字符串拼接
    var tbody = $('#tbody');
    var content="";
    $.ajax({
        url:"/user/userList.do",
        type:"post",
        dataType:"json",
        success:function (response) {
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
                    "<td><span class='iconfont icon-edit'></span><span class='iconfont icon-delete'></span></td>"+
                    "</tr>"
            });
            tbody.html(content);
        }
    });

};