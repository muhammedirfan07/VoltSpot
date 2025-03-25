import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-neutral-950 z-100  text-white pt-6">
            <div className="container font-[Dm_Sans]  z-100  mx-auto px-4">
                <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                    <div className='flex flex-col justify-center p-3'>
                        <h1 className="text-xl text-green-100 font-bold">
                            <i class="fa-solid fa-bolt text-2xl" style={{ color: "#f0efef" }}></i>
                            <span className="text-2xl  text-green-600 font-michroma">Volt</span>Spot
                        </h1>
                        <p className="my-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi, quibusdam.</p>
                        <Link to={'/homecolab'}> <button className='py-2 px-6  rounded-lg bg-emerald-800'>Patterns</button></Link>
                    </div>
                    <div className='col-span-2 flex justify-evenly  p-3'>
                        <div className='flex flex-col p-3'>
                            <h1 className="text-2xl font-bold mb-3">Resourse</h1>
                            <ul className="space-y-2">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/about">About</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                                <li><Link to="/collabration">Collabration</Link></li>
                            </ul>
                        </div>
                        <div className='flex flex-col  p-3'>
                            <h1 className="text-2xl font-bold mb-3">Contact US</h1>
                            <p>
                                123, Main Road, New City
                                <br />
                                State, Country
                                <br />
                                <span className='py-1'>Email:</span>evStaion@gmail.com <br />
                                <span className='py-1'>Phone:</span>+91 1234567890
                            </p>
                        </div>
                    </div>
                    <div className='flex flex-col text-center  p-3 '>
                        <h1 className="text-2xl font-bold mb-3" >Follower Us</h1>
                        <div className='flex justify-center space-x-6'>
                            <a className="mb-3" style={{ textDecoration: "none", color: "white", fontSize: "18px" }} href="https://x.com/?" target="_blind"><i class="fa-brands fa-twitter"></i></a>
                            <a className="mb-3" style={{ textDecoration: "none", color: "white", fontSize: "18px" }} href="" target="_blind"><i class="fa-brands fa-instagram"></i></a>
                            <a className="mb-3" style={{ textDecoration: "none", color: "white", fontSize: "18px" }} href="" target="_blind"><i class="fa-brands fa-facebook"></i></a>
                            <a className="mb-3" style={{ textDecoration: "none", color: "white", fontSize: "18px" }} href="" target="_blind"><i class="fa-brands fa-github"></i></a>
                        </div>
                    </div>
                </div>
                <div className='w-full text-center'> <span >copy right developed irfan</span></div>
            </div>
        </footer>


    );
};

export default Footer;