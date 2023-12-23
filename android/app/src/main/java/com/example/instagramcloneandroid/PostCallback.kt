package com.example.instagramcloneandroid

interface PostCallback {
    fun onDeletePost(postId: Int)
    fun onComment(text: String, postId: Int)
}