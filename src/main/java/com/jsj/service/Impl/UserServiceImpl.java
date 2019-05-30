package com.jsj.service.Impl;

import com.jsj.bean.Page;
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
    private UserMapper userMapper;

//    public List<User> getUser(User user){
//        return userMapper.getUser(user);
//    }

    @Override
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

    @Override
    public Map<String, Object> deleteUser(Integer id) {
        Map<String,Object> msg = new HashMap<>();
        if (userMapper.deleteUser(id)>0){
            msg.put("success",true);
        }else {
            msg.put("success",false);
        }
        return msg;
    }

    @Override
    public Map<String, Object> updateUser(User user) {
        Map<String,Object> msg = new HashMap<>();
        if (userMapper.updateUser(user)>0){
            msg.put("success",true);
        }else {
            msg.put("success",false);
        }
        return msg;
    }

}
