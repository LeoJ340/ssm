package com.jsj.controller;

import com.jsj.bean.User;
import com.jsj.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "users.do",method = RequestMethod.POST)
    public List<User> get(User user){
        return userService.getUser(user);
    }

    @RequestMapping(value = "insert.do",method = RequestMethod.POST)
    public Map<String,Object> insert(User user){
        return userService.insertUser(user);
    }

    @RequestMapping(value = "delete.do",method = RequestMethod.POST)
    public Map<String,Object> delete(Integer id){
        return userService.deleteUser(id);
    }
}
