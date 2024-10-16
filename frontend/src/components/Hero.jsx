
const Hero = () => {
  return (
    <>

      <div className="bg-white">
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div className="text-9xl text-center font-sans font-semibold font-black text-cyan-600 antialiased pt-20 ">AppOintment</div>
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          </div>
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                Announcing our next round of features. <a href="#" className="font-semibold text-indigo-600"><span className="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span></a>
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Your medical care facility</h1>
              <p className="mt-6 text-lg leading-8 text-gray-600"> We connect patients with top healthcare providers at convenience </p>
              <p><svg class="animate-bounce w-6 h-6 "></svg></p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a href="/login">
                  <button className="bg-blue-500  text-white font-bold py-2 px-4 rounded drop-shadow-xl hover:drop-shadow-2xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ">
                    Sign In
                  </button>
                </a>
                <a href="/register">
                  <button className="bg-green-sage  text-white font-bold py-2 px-4 rounded drop-shadow-xl hover:drop-shadow-2xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ">
                    Sign Up
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
            {/* <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#046856] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" ></div> */}
          </div>
        </div>
      </div>


      <div className='bg-white flex flex-row justify-center justify-items-stretch content-evenly'>
        <div className="justify-evenly basis-1/2 p-5 text-5xl p-5  content-center">
        <div className='m-10 p-6 font-poppins text-center leading-normal '>
          No need to wait in lines, just in a few clicks your appointment with your doctor is set
          </div>
        </div>
        <div className=" basis-1/2"><img src="/doctor-appointment.jpg" alt='Doctor is checking bp of patient' /></div>
      </div>


      <div className='bg-white flex flex-row justify-evenly justify-items-stretch content-evenly gap-4'>
        <div className=" basis-1/2"><img className="w-600" src="/doctors.jpg" alt='Doctor is checking bp of patient' /></div>
        <div className=" basis-1/2 p-10 text-5xl font-poppins text-center content-center leading-normal ">
         We keep record of all your checkups from all your doctors in one place
        </div>
      </div>


      <div className='bg-white flex flex-row justify-center justify-items-stretch content-evenly'>
        <div className="justify-evenly basis-1/2 p-5 text-5xl p-5  content-center">
        <div className='m-10 p-10 font-poppins text-center leading-normal '>
          You only need to go to the doctor when physical checkup is necessary
          </div>
        </div>
        <div className=" basis-1/2"><img src="/doctor-patient-bp-check.jpg" alt='Doctor is checking bp of patient' /></div>
      </div>


      <div className='bg-white flex flex-row justify-evenly justify-items-stretch content-evenly'>
        <div className=" basis-1/2"><img src="/AdobeStock_136041571.jpeg" alt='Doctor is checking bp of patient' /></div>
        <div className=" basis-1/2 text-5xl p-10 font-poppins text-center content-center leading-normal">
          We build trust between patients and doctors
        </div>
      </div>

      <div className='bg-white flex flex-row justify-center justify-items-stretch content-evenly '>
        <div className="justify-evenly basis-1/2 p-5 text-5xl p-5  content-center">
        <div className='m-10 p-10 font-poppins text-center '>
          Video calling with your doctor
          </div>
        </div>
        <div className=" basis-1/2"><img src="/telemedicine-1.jpg" alt='Doctor is checking bp of patient' /></div>
      </div>

      <div className="h-96 justify-evenly basis-1/2 p-5 text-5xl p-5 text-center bg-gray-battleship content-center">
         
        <div className='h-64 p-4  grid grid-flow-col justify-stretch'>
          <div className='p-5 '>Acmeware</div>
          <div className='p-5 '>
            <div>About us</div>
            <div>Contact us</div>
            <div>Terms of Service</div>
            <div>Privacy Policy</div>
          </div>
          <div className='p-5 '>Follow us on social
          <div>LinkedIn</div>
          <div>Facebook</div>
          <div>Twitter</div>

          </div>
        </div>
        <div className="text-center text-xl">&copy; 2024 <span className="">AppOintment by <a href="https://www.acmeware.net" target="_blank">www.acmeware.net</a></span> All rights reserved.</div>
      </div>
    </>
  );
};

export default Hero;

