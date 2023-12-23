package com.example.instagramcloneandroid.api

import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object InstagramApiService {

    const val BASE_URL="http://192.168.18.119:8000/"

    var api: InstagramApi

    init {
        val okHttpClient= OkHttpClient.Builder()
        val logging=HttpLoggingInterceptor()
        logging.level=HttpLoggingInterceptor.Level.BODY
        okHttpClient.addInterceptor(logging)

        api=Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .client(okHttpClient.build())
            .build()
            .create(InstagramApi::class.java)
    }

}