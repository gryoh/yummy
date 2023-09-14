import { useRouter } from "next/router";
import React, {useState, useRef } from "react";
import Layout from "../../components/common/layout";
import MemberInput from "../../components/member/MemberInput";
import MemberBtn from "../../components/member/MemberBtn";
import MemberLine from "../../components/member/MemberLine";
import KakaoBtn from "../../components/member/KakaoBtn";
import NaverBtn from "../../components/member/NaverBtn";
import Link from "next/link";
import styles from "../../components/member/member.module.css";
import axios from 'axios';

export default function Login() {
    const [loginId, setLoginId] = useState("");
    const [loginPw, setLoginPw] = useState("");

    const childRef = useRef();
 
    const parentBtnEvent = (e) => {
        axios.post('/member/goLogin',
        {
            loginId : loginId,
            mbrPw :loginPw
        })
        .then((res) => {
            if ('F' != res.data) {
                window.sessionStorage.setItem('mbrLoginId', res.data);
                location.href = '/mypage/myPage'
            }
           
        })
        .catch((error) => {
            console.log('error --->' + error);
        })
    }

    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }


    const handleLoginId = (e) => {
        setLoginId(e.target.value);
      };
    
    const handleLoginPw = (e) => {
        setLoginPw(e.target.value);
    };

    return (
        <Layout>
            <KakaoBtn text='카카오 로그인'/>
            <NaverBtn text='네이버 로그인'/>
            <MemberLine text='또는'/>
            
            <MemberInput placeholder='이메일' name='eMail' value={loginId} parentInputEvent={handleLoginId} ref={childRef}/><br />
            <MemberInput placeholder='비밀번호' name='passWord' value={loginPw} parentInputEvent={handleLoginPw} ref={childRef}/><br />
            <MemberBtn name='로그인' type='button' parentBtnEvent={parentBtnEvent} ref={childRef}/><br />
            
            <p className={styles.base_txt_box}>계정이 없으신가요? <Link href="/member/join" className={styles.blue_link_txt}>가입하기</Link> </p>
        </Layout>
    );
}
