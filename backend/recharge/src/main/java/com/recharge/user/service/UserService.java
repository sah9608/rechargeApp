package com.recharge.user.service;

import com.recharge.user.vo.UserVO;

public interface UserService {
    int insertUser(UserVO user);
    boolean checkUserId(String userId);
    boolean checkUserNickname(String userNickname);
    boolean checkUserEmail(String userEmail);
    UserVO login(UserVO user);
    boolean sendUserIdToEmail(UserVO user);
    boolean requestPasswordReset(UserVO user);
    UserVO getUserByResetToken(String resetToken);
    boolean resetPassword(UserVO user);
    boolean sendEmailAuthentication(UserVO user);
    boolean verifyEmail(UserVO user);
}
