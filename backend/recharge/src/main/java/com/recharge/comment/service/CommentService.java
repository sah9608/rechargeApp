package com.recharge.comment.service;

import com.recharge.comment.dao.CommentDAO;
import com.recharge.comment.vo.CommentVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentDAO commentDAO;

    public boolean writeComment(CommentVO commentVO) {
        //db에  insert 성공하면 1 반환, 0보다 크면 true
        return commentDAO.insertComment(commentVO) > 0;
    }

    public List<CommentVO> getCommentList(String targetType, String targetId) {
        CommentVO vo = new CommentVO();
        vo.setTargetType(targetType);
        vo.setTargetId(targetId);
        return commentDAO.getCommentList(vo);
    }

    public boolean deleteComment(int commentId, String userId, String userRole) {
        CommentVO vo = new CommentVO();
        vo.setCommentId(commentId);
        vo.setUserId(userId);
        vo.setUserRole(userRole);

        return commentDAO.deleteComment(vo) > 0;
    }
    public boolean updateComment(CommentVO commentVO) {
        //업데이트된 행이 1개 이상이면 true(성공)
        return commentDAO.updateComment(commentVO) > 0;
    }
}
