# ssm框架整合案例

本案例基于spring springmvc mybatis框架整合，前端使用jquery实现的前后端半分离项目<br/>
##### 欢迎star、fork学习

## 关于案例
### 环境
    开发环境：jdk8+mysql8+IDEA+tomcat+maven
    后端：spring+springmvc+mybatis
    前端：jQuery+bootstrap
### 需求
    实现用户的基本增删改查
### 项目结构
    ├── README.md 
    ├── pom.xml
    └── src
        └── main
            ├── java
            │   └── com
            │       └── jsj
            │           ├── controller  -- SpringMVC-WEB层控制器(api接口)
            │           ├── mapper  -- Mybatis接口和映射文件。本项目采用了mybatis的接口开发，所以接口和映射文件放在同一目录下，并且名称相同。
            │           ├── bean  -- JavaBean实体类
            │           └── service  -- service业务层
            ├── resources  -- maven项目存放配置文件的根目录(classpath:)
            │   ├── ssm.sql  -- 项目数据库创建和表创建的SQL语句
            │   ├── log4j.properties  -- 日志打印配置文件
            │   └── db.properties  -- 数据源配置文件
            │   └── spring.xml  -- spring整合mybatis的配置文件
            │   └── SpringMvc.xml  -- springmvc的配置文件
            └── webapp  -- 项目的根目录
                ├── WEB-INF
                ├── bootstrap-4.3.1-dist  -- bootstrap依赖文件
                └── css  -- 样式文件
                └── js  -- javascript脚本文件
                └── index.html  -- 页面
## 实现
### 准备
创建数据库以及对应po类，po类属性尽量与数据表列名对应，并提供属性setter和getter方法。
### 1.新增用户
#### 1.1编写mapper接口及sql映射文件
我们使用了Mybatis的接口代理开发模式（保证接口和配置文件在同一目录下且名称相同）

    <insert id="insertUser" parameterType="User">
        insert  into user (name,sex,age,`tel-number`) value (#{name},#{sex},#{age},#{telNumber})
    </insert>
    
所有字段均为必填项
* id对应mapper接口的方法名
* parameterType指定传入参数的类型，User对应com.jsj.bean.User类。在spring.xml配置mybatis时使用了别名配置，会自动扫描指定包并将类名作为该类全类名的别名，我们就不需要写完整的全类名了。
#### 1.2编写Service层
我们采用面向接口编程，应创建service接口及实现类。

    public Map<String, Object> insertUser(User user) {
        Map<String,Object> msg = new HashMap<>();
        if (userMapper.insertUser(user)>0){
            msg.put("success",true);
        }else {
            msg.put("success",false);
        }
        return msg;
    }
新增用户，我们需要返回一个结果给前端，这里我使用HashMap集合以键值对的形式返回结果。
#### 1.3编写Controller层
我们采用前后端半分离开发模式，前端使用jquery的ajax请求后端获取数据，因此controller层只返回数据不返回视图，所以SpringMvc.xml中无需配置视图解析器。
使用@RestController注解标记控制层，它会自动将数据转换为json格式。同时需要依赖json相关jar包。

    <dependency>
      <groupId>com.fasterxml.jackson.core</groupId>
      <artifactId>jackson-databind</artifactId>
      <version>2.9.9</version>
    </dependency>
    <dependency>
      <groupId>com.fasterxml.jackson.core</groupId>
      <artifactId>jackson-core</artifactId>
      <version>2.9.9</version>
    </dependency>

<br/>

    @RequestMapping(value = "insert.do",method = RequestMethod.POST)
    public Map<String,Object> insert(User user){
        return userService.insertUser(user);
    }

* RequestMapping标注请求的路径value以及请求方法为POST
* springmvc能自动将传递过来的数据封装成我们在参数中指定的po类。为避免发生未知错误，有时使用@RequestParam注解标记参数。
### 2.删除用户
#### 2.1编写mapper接口及sql映射文件
    <delete id="deleteUser" parameterType="Integer">
        delete from user where id = #{id}
    </delete>

通过主键id删除数据
#### 2.2编写Service层
与新增类似，需要调用mapper方法并向控制层返回成功或失败的Map结果
#### 2.3编写Controller层
    @RequestMapping(value = "delete.do",method = RequestMethod.POST)
    public Map<String,Object> delete(Integer id){
        return userService.deleteUser(id);
    }
前端需要传递用户的id值，通过id删除用户信息。<br/>
批量删除：遍历出所有数据列表中被选中的数据条目，循环删除，这里的ajax要将默认异步处理设为同步。

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
                getPageData(beginIndex,pageSize,null);
            }else {
                alert("删除失败！");
            }
        }
    }
### 3.更新用户
#### 3.1编写mapper接口及sql映射文件
    <update id="updateUser" parameterType="User">
        update user set name = #{name} , sex = #{sex} , age = #{age} , `tel-number` = #{telNumber} where id = #{id}
    </update>
#### 3.2编写service层
与新增、删除类似，这里不做更多解释。
#### 3.3编写controller层
    @RequestMapping(value = "update.do",method = RequestMethod.POST)
    public Map<String,Object> update(User user){
        return userService.updateUser(user);
    }
更新用户需点击编辑按钮触发渲染更新模态框方法弹出模态框将数据渲染到模态框中，为避免多次处理请求，在进入页面渲染数据时直接将数据绑定到渲染更新模态框方法的参数中。以下是渲染更新模态框方法的js代码：
   
    function showUpdateModal(name,sex,age,telNumber,id) {
        $("#updateModal").modal("show");
        $("#update_data").find("input[name=id]").val(id);
        $("#update_data").find("input[name=name]").val(name);
        $("#update_data").find("input[name=sex][value="+sex+"]").attr('checked', 'checked');
        $("#update_data").find("input[name=age]").val(age);
        $("#update_data").find("input[name=telNumber]").val(telNumber);
    }
### 4.分页查询
#### 4.1封装分页结果集page
    public class Page<T> implements Serializable {

        //当前页
        private int pageIndex;

        //总页数=总记录数/每页显示的记录数
        private int totalPage;

        //总记录数
        private int totalCount;

        //每页显示的记录数
        private int pageSize;

        //每页显示的数据
        private List<T> beanList;

    }
同时需要提供构造器及setter、setter。根据不同结果类型，所以这里要用泛型类
#### 4.2编写mapper接口及sql映射文件
    <select id="getUsersByPage" parameterType="Map" resultMap="userResultMap">
        select * from user
        <include refid="condition"/>
        <if test="start != null and size != null">
            limit #{start},#{size}
        </if>
    </select>
* userResultMap指向结果集映射，有时数据库的字段未必能完全与javabean类对应而需要特别映射。
* include标签代表引入外部的sql语句，这里是用于有条件查询的情况，refid表示外部sql语句的id，以下是引入的条件sql语句：

        <sql id="condition">
            <where>
                <if test="id!=null">
                    and id = #{id}
                </if>
                <if test="name!=null">
                    and name = #{name}
                </if>
                <if test="sex!=null">
                    and sex = #{sex}
                </if>
                <if test="age!=null">
                    and age = #{age}
                </if>
                <if test="telNumber!=null">
                    and telNumber = #{telNumber}
                </if>
            </where>
        </sql>
* limit语句通过start、size两个参数确定查询结果返回。
#### 4.3编写service层
    public Page getUserPage(User user,int pageIndex, int pageSize) {

        // 设置查询参数
        Map<String,Object> paramsMap = new HashMap<>();
        paramsMap.put("id",user.getId());
        paramsMap.put("name",user.getName());
        paramsMap.put("sex",user.getSex());
        paramsMap.put("age",user.getAge());
        paramsMap.put("telNumber",user.getTelNumber());
        paramsMap.put("start",(pageIndex - 1) * pageSize);
        paramsMap.put("size",pageSize);
        // 返回bean集合
        List<User> users = userMapper.getUsersByPage(paramsMap);
        
        // 封装分页结果集
        Page<User> userPage = new Page<>();
        userPage.setPageIndex(pageIndex);
        userPage.setPageSize(pageSize);
        int totalCount = userMapper.getUserTotalCount();
        userPage.setTotalCount(totalCount);
        userPage.setTotalPage((int) Math.ceil((double) totalCount / (double) pageSize));
        userPage.setBeanList(users);

        return userPage;
    }
业务层接受pageIndex(当前页码数)、pageSize(每页显示数)和有可能存在条件的user，将这些参数封装到Map集合里作为sql查询参数查出满足所有条件的User类集合，再查询出user表数据的总条数totalCount，通过Math的ceil方法得到分页的最大页数TotalPage，最后将当前页码数、每页显示数、User类集合、数据总条数和最大页数封装到page分页结果集中。
# 项目运行截图
![Image text](https://github.com/Lionel340/ssm/blob/master/md_image/index.png)