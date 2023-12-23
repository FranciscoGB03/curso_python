package com.example.instagramcloneandroid

import android.app.AlertDialog
import android.app.Dialog
import android.os.Bundle
import android.view.View
import androidx.fragment.app.DialogFragment
import com.example.instagramcloneandroid.databinding.LoginDialogBinding


class LoginDialog(val callback: AuthCallback): DialogFragment() {
    lateinit var binding: LoginDialogBinding

    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
       return activity?.let {
       binding=LoginDialogBinding.inflate(it.layoutInflater)

       binding.loginButton.setOnClickListener{
           binding.errorField.visibility=View.GONE

           val username=binding.usernameET.text.toString()
           val password=binding.passwordET.text.toString()
           var msg=""
           if(username.isEmpty()) msg += "Username cannot be empty\n"
           if(password.isEmpty()) msg += "Password cannot be empty\n"

           if(msg.isEmpty()){
               callback.onLogin(username,password)
               this@LoginDialog.dismiss()
           }else{
               msg=msg.substring(0,msg.length-1)
               binding.errorField.text=msg
               binding.errorField.visibility=View.VISIBLE
           }
       }
           return AlertDialog.Builder(it)
               .setView(binding.root)
               .create()
       }?:super.onCreateDialog(savedInstanceState)
    }
}