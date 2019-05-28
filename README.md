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
            │   └── cpm
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
    
* id对应mapper接口的方法名
* parameterType指定传入参数的类型，User对应com.jsj.bean.User类。在spring.xml配置mybatis时使用了别名配置，会自动扫描指定包并将类名作为该类全类名的别名，我们就不需要写完整的全类名了。
#### 1.2编写Service层
我们采用面向接口编程，应创建service接口及实现类。

接口方法：

    Map<String,Object> insertUser(User user);
实现：
    
    @Override
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
