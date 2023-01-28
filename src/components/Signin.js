import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
function Signin() {
    // {
    //     "name":"bijoy",
    //     "email":"saadsu@gmail.com",
    //     "password":"boom123123"
    //   }

    const [credentials, setCredentials] = useState({email:"",password:""});
    const history = useNavigate();


    const handleClick = async (e)=>{
        console.log("yea this is clicked");
        e.preventDefault();
        const response = await fetch("http://localhost:5000/app/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              
      
            },
      
            body: JSON.stringify({email:credentials.email,password:credentials.password})
          });
         const  json = await response.json()
        if(json.success){
            localStorage.setItem('token',json.authToken);
            history('/');
        }
        else{
            alert("its invalid credecntials");
        }
          
      
    }



    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
       
    }


  return (
    <form>
    <div className="font-mono">
		{/* <!-- Container --> */}
		<div className="container mx-auto">
			<div className="flex justify-center px-6 my-12">
				{/* <!-- Row --> */}
				<div className="w-full xl:w-3/4 lg:w-11/12 flex">
					{/* <!-- Col --> */}
					<div
						className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
						style={{"background-image": "url('https://source.unsplash.com/K4mSJ7kc0As/600x800')"}}
					></div>
					{/* <!-- Col --> */}
					<div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
						<h3 className="pt-4 text-2xl text-center">Welcome Back!</h3>
						<form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
							<div className="mb-4">
								<label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
									Email
								</label>
								<input
									className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									id="email"
                                    name="email"
									type="email"
									placeholder="Email"
                                    onChange={onChange}
								/>
							</div>
							<div className="mb-4">
								<label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
									Password
								</label>
								<input
									className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									id="password"
                                    name="password"
									type="password"
									placeholder="******************"
                                    onChange={onChange}
								/>
								<p className="text-xs italic text-red-500">Please choose a password.</p>
							</div>
							<div className="mb-4">
								<input className="mr-2 leading-tight" type="checkbox" id="checkbox_id" />
								<label className="text-sm" htmlFor="checkbox_id">
									Remember Me
								</label>
							</div>
							<div className="mb-6 text-center">
								<button
									className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
									type="button"
                                    onClick={handleClick}
								>
									Sign In
								</button>
							</div>
							<hr className="mb-6 border-t" />
							<div className="text-center">
								<Link
									className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
									to="/signup"
								>
									Create an Account!
								</Link>
							</div>
							<div className="text-center">
								<a
									className="inline-block text-sm  text-blue-500 align-baseline hover:text-blue-800"
									href="/"
								>
									Forgot Password?
								</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
    </form>
  )
}

export default Signin
