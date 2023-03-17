import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";


const Nav = () => {

  const initialUserData = localStorage.getItem('userData') ?
    JSON.parse(localStorage.getItem('userData')) : {};     //userdata가 localstorage에 있을 경우 가져오고 없으면 빈 객체

  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  const[searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  
  const [userData, setUserData] = useState(initialUserData);   //user_img 가져오기 위함


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){      //로그인 상태일 때
        if(pathname==="/")    //로그인 페이지에서만
         navigate("/main");   //바로 메인 페이지로 이동
      } else{         //로그인 상태 아닐 때
        navigate("/");       //다른 페이지로 이동해도 로그인 페이지로 돌아옴
      }
    })
  }, [auth, navigate, pathname])




  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])


  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShow(true);
    } else {
      setShow(false); 
    }
  }

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  }


  const handleAuth = () => {
    signInWithPopup(auth, provider)
    .then(result => {
      // console.log('result.user', result.user);  //user data
      setUserData(result.user);
      localStorage.setItem('userData', JSON.stringify(result.user));   //새로고침 해도 user_img 뜨게
    })
    .catch(error => {
      console.log(error);
    })
  }

  const handleLogOut = () => {
    signOut(auth).then(() => {
      setUserData({});   //userdata 비워줌
      navigate("/");     //로그인(홈) 페이지로 이동
    })
    .catch((error) => {
      alert(error.message)
    });
  }

  return (
    <NavWrapper show={show}>
      <Logo>
        <img 
          alt="Disney Plus Logo"
          src="/images/logo.svg"
          onClick={() => (window.location.href = "/")}>
        </img>
      </Logo>

      {pathname === "/" ? (
      <Login onClick={handleAuth}>Login</Login>
      ) : (
      <>
        <Input 
          value={searchValue}
          onChange={handleChange}
          className='nav__input'
          type="text"
          placeholder='검색해주세요.'
        />

        <SignOut >
          <UserImg src={userData.photoURL} alt={userData.displayName}/>
          <DropDown >
            <span onClick={handleLogOut}>Sign Out</span>
          </DropDown>
        </SignOut>
        </>
      )}

    </NavWrapper>
  )
}

export default Nav;




const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19)
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius:  4px;
  box-shadow: rgb(0 0 0 /50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100%;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

const UserImg = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;




const Login = styled.a`
  background-color: rgba(0,0,0,0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  transition: all 0.2s ease 0s;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
    color: gray;
    border-color: transparent;
  }
`;

const Input = styled.input`
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0);
    background-color: rgba(0,0,0, 0.582);
    border-radius: 5px;
    color: white; 
    padding: 5px;
    border: none;
`;

const NavWrapper = styled.nav `
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${props => props.show ? "#090b13" : "transparent"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
  `;

  const Logo = styled.a `
    padding: 0;
    width: 80px;
    margin-top: 4px;
    max-height: 70px;
    font-size: 0;
    diplay: inline-block;
    
    img {
      display: block;
      width: 100%;
    }
  `

