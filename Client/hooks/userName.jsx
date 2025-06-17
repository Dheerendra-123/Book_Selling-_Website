
const userName = () => {
    const [userName,setUserName]=useState('');
    useEffect(()=>{
        const userData=JSON.parse(localStorage.getItem('user'));
        const Name = userData?.name || '';
        setUserName(Name)
    },[])
  
    return userName;
}

export default userName;