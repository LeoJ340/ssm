package com.jsj.service.Impl;

import com.jsj.mapper.UserMapper;
import com.jsj.bean.User;
import com.jsj.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper dao;

    public List<User> getUser(User user){
        return dao.getUser(user);
    }

    @Override
    public Map<String, Object> insertUser(User user) {
        Map<String,Object> msg = new HashMap<>();
        try {
            dao.insertUser(user);
            msg.put("success",true);
        }catch (Exception e){
            msg.put("success",false);
        }
        return msg;
    }

    @Override
    public Map<String, Object> deleteUser(Integer id) {
        Map<String,Object> msg = new HashMap<>();
        try {
            dao.deleteUser(id);
            msg.put("success",true);
        }catch (Exception e){
            msg.put("success",false);
        }
        return msg;
    }

}
