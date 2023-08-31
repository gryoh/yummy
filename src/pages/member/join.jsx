import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import Layout from '../../components/common/layout';
import utilStyles from '../../assets/utils.module.css';
import Head from 'next/head';
import MemberInput from '../../components/member/MemberInput';
import MemberBtn from '../../components/member/MemberBtn';
import MemberLine from '../../components/member/MemberLine';
import NaverBtn from '../../components/member/NaverBtn';
import KakaoBtn from '../../components/member/KakaoBtn';
import styles from '../../components/member/member.module.css';
import axios from 'axios';


export default function Join() {
    const [loginId, setLoginId] = useState('');
    const [loginPw, setLoginPw] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    
    const childRef = useRef();

    /* input handeler */
    const handleLoginId = (e) => {
        setLoginId(e.target.value);
      };
    
    const handleLoginPw = (e) => {
        setLoginPw(e.target.value);
    };
    const handlePhone = (e) => {
        setPhone(e.target.value);
    };
    const handleName = (e) => {
        setName(e.target.value);
    };

    /* 
        회원가입 버튼 클릭이벤트 
        1. 유효성 체크
        2. 아이디 중복체크
        3. 회원가입
    */
    const parentBtnEvent = (e) => {
        /* 회원가입전 유효성 체크 */
        var check = false;
        check = joinValidationCheck ('id', loginId) ? true : false;
        if (check) check = joinValidationCheck ('name', name) ? true : false;
        if (check) check = joinValidationCheck ('phone', phone) ? true : false;
        if (check) check = joinValidationCheck ('pw', loginPw) ? true : false;

        if (check) {
            axios.post('/member/checkMemberId',
            {
                loginId : loginId,
            })
            .then((res) => {
                if(true == res.data) {
                    axios.post('/member/memberJoin',
                    {
                        loginId : loginId,
                        mbrPw : loginPw,
                        name : name,
                        mbrPhon : phone,
                    })
                    .then((res) => {
                        console.log(res.data);
                    })
                    .catch((error) => {
                        console.log('error --->' + error);
                    })
                } else {
                    alert('이미 가입된 아이디 입니다.\n다른아이디로 시도해 주세요.')
                }
             
            })
            .catch((error) => {
                console.log('error --->' + error)
            })  
        } else {
            return false;
        }
    }

    /* 유효성 체크 */
    const joinValidationCheck = (type, val) => {
        var result = true;
        if ('id' == type) {
            var exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
			if(false == exptext.test(val)) {
                alert('이메일형식이 올바르지 않습니다.');
                return false;
            }
        } else if ('pw' == type) {
            var exptext = /^[a-zA-Z0-9]{4,12}$/;
            if(false == exptext.test(val)) {
                alert('비밀번호를 4~12자의 영문 대소문자와 숫자로만 입력하여 주세요.');
                return false;
            }
        } else if ('name' == type) {
            var exptext = /^[가-힣]{2,15}$/;
			if(false == exptext.test(val)) {
                alert('이름형식이 올바르지 않습니다.');
                return false;
            }
        } else if ('phone' == type) {
            var exptext = /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/g;
            if(false == exptext.test(val)) {
                alert('전화번호가 올바르지 않습니다.');
                return false;
            }
        }
        return result;
    }

    const router = useRouter();
    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <Layout>
            <KakaoBtn text='카카오 로그인'/>
            <NaverBtn text='네이버로 시작하기'/>
            <MemberLine text='또는'/>
       
            <MemberInput placeholder='이메일) example@example.com' name='loginId' value={loginId} parentInputEvent={handleLoginId} ref={childRef}/><br />
            <MemberInput placeholder='성명) 홍길동' name='name' value={name} parentInputEvent={handleName} ref={childRef}/><br />
            <MemberInput placeholder='전화번호) 01012341234' name='phone' value={phone} parentInputEvent={handlePhone} ref={childRef}/><br />
            <MemberInput placeholder='비밀번호) 4~12자의 영문 대소문자와 숫자' name='loginPw' value={loginPw} parentInputEvent={handleLoginPw} ref={childRef}/><br />
            <MemberBtn name='가입' type='button' parentBtnEvent={parentBtnEvent} ref={childRef}/>
           
            <p className={styles.base_txt_box}>가입하면 OOO의 약관 데이터 정책 및 쿠키 정책에 동의하게 됩니다.</p>
        </Layout>
    );
}
