package com.jsj.controller;

import com.jsj.bean.Page;
import com.jsj.bean.User;
import com.jsj.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "userpage.do",method = RequestMethod.POST)
    public Page getUserPage(User user,
                    // 页码---默认第一页
                    @RequestParam(value = "pageIndex", required = false, defaultValue = "1") int pageIndex,
                    // 每页显示数据条数 默认3条
                    @RequestParam(value = "pageSize", required = false, defaultValue = "3") int pageSize){
        return userService.getUserPage(user,pageIndex,pageSize);
    }

    @RequestMapping(value = "insert.do",method = RequestMethod.POST)
    public Map<String,Object> insert(User user){
        return userService.insertUser(user);
    }

    @RequestMapping(value = "delete.do",method = RequestMethod.POST)
    public Map<String,Object> delete(Integer id){
        return userService.deleteUser(id);
    }

    @RequestMapping(value = "update.do",method = RequestMethod.POST)
    public Map<String,Object> update(User user){
        return userService.updateUser(user);
    }
}
