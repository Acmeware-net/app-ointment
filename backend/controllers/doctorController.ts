import asyncHandler from 'express-async-handler';
import Doctor from '../models/doctorModel.js';
import generateToken from '../utils/generateToken.js';
import { DoctorsResponse, mapper } from '../responses/DoctorsResponse.js';




// @desc    Auth doctor & get token
// @route   POST /api/doctors/auth
// @access  Public
const authDoctor = asyncHandler(async (req: any, res: any) => {
  const { email, password } = req.body;
  console.log(`email is ${email}`);
  const doctor = await Doctor.findOne({ email });
  // @ts-ignore
  if (doctor && (await doctor.matchPassword(password))) {
    generateToken(res, doctor._id);

    res.json({
      _id: doctor._id,
      name: doctor.name,
      email: doctor.email,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});




// @desc    Register a new doctor
// @route   POST /api/doctors
// @access  Public
const registerDoctor = asyncHandler(async (req: any, res: any) => {
  const { name, email, password, dateofbirth, gender, phone, address, city, state, license, specialization, experience } = req.body;
  console.log(`Doctor comes to login with email ${email}`)
  const doctorExists = await Doctor.findOne({ email });

  if (doctorExists) {
    res.status(400);
    throw new Error('Doctor already exists');
  }

  const doctor = await Doctor.create({
    name,
    email,
    password,
    dateofbirth,
    gender,
    phone,
    address,
    city,
    state,
    specialization,
    experience,
    license
  });

  if (doctor) {
    generateToken(res, doctor._id);

    res.status(201).json({
      _id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      dateofbirth: doctor.dateofbirth,
      gender: doctor.gender,
      phone: doctor.phone,
      address: doctor.address,
      city: doctor.address,
      state: doctor.state,
      specialization: doctor.specialization,
      headline: doctor.headline,
      bio: doctor.bio,
      experience: doctor.experience
    });
  } else {
    res.status(400);
    throw new Error('Invalid doctor data');
  }
});




// @desc    Logout doctor / clear cookie
// @route   POST /api/doctors/logout
// @access  Public
const logoutDoctor = (req: any, res: any) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};




// @desc    Get doctor profile
// @route   GET /api/doctors/profile
// @access  Private
const getDoctorProfile = asyncHandler(async (req: any, res: any) => {
  const doctor = await Doctor.findById(req.doctor._id);
  console.log(`doctor id: ${req.doctor._id}`)

  if (doctor) {
    res.json({
      _id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      dateofbirth: doctor.dateofbirth,
      gender: doctor.gender,
      phone: doctor.phone,
      address: doctor.address,
      city: doctor.city,
      state: doctor.state,
      specialization: doctor.specialization,
      headline: doctor.headline,
      bio: doctor.bio,
      experience: doctor.experience
    });
  } else {
    res.status(404);
    throw new Error('Doctor not found');
  }
});



// @desc    Get doctor by id
// @route   GET /api/users/doctor/:id
// @access  Public
const getDoctorById = asyncHandler(async (req: any, res: any) => {
  console.log('inside get a doctor by id controller method')
  const id = req.params.id;
  console.log(`id: ${id}`)
  const doctor = await Doctor.findById(id);
  if (doctor) {
    res.json({
      id: doctor._id,
      user_id: doctor.userId,

      name: doctor.name,
      email: doctor.email,
      dateofbirth: doctor.dateofbirth,
      gender: doctor.gender,
      phone: doctor.phone,
      address: doctor.address,
      city: doctor.city,
      state: doctor.state,
      specialization: doctor.specialization,
      experience: doctor.experience
    });
  } else {
    res.status(404);
    throw new Error('Doctor not found');
  }
});



// @desc    Get doctor by user id
// @route   GET /api/users/doctor/id/:id
// @access  Public
const getDoctorByUserId = asyncHandler(async (req: any, res: any) => {
  console.log('inside a controller method getDoctorByUserId')
  const userId = req.params.id;
  console.log(`id: ${userId}`)
  const doctor = await Doctor.findOne({"userId":userId});
  if (doctor) {
    res.json({
      id: doctor._id,
      user_id: doctor.userId,
      name: doctor.name,
      email: doctor.email,
      dateofbirth: doctor.dateofbirth,
      gender: doctor.gender,
      phone: doctor.phone,
      address: doctor.address,
      city: doctor.city,
      state: doctor.state,
      specialization: doctor.specialization,
      experience: doctor.experience
    });
  } else {
    res.status(404);
    throw new Error('Doctor not found');
  }
});




// @desc    Get doctor profile
// @route   GET /api/doctors/
// @access  Public
const getDoctors = asyncHandler(async (req: any, res: any) => {
  const doctorsList = await Doctor.find({});
  
  if (doctorsList) {
    var doctors: DoctorsResponse[] = [];
    doctorsList.map((doctor)=>{doctors.push(mapper(doctor))});
    res.json({doctors});
  } else {
    res.status(404);
    throw new Error('Doctors list not found');
  }
});




// @desc    Update doctor profile
// @route   PUT /api/doctors/profile
// @access  Private
const updateDoctorProfile = asyncHandler(async (req: any, res: any) => {
  const doctor = await Doctor.findById(req.doctor._id);

  if (doctor) {
    doctor.name = req.body.name || doctor.name;
    doctor.email = req.body.email || doctor.email;
    doctor.dateofbirth = req.body.dob || doctor.dateofbirth;
    doctor.gender = req.body.gender || doctor.gender;
    doctor.phone = req.body.phone || doctor.phone;
    doctor.address = req.body.address || doctor.address;
    doctor.city = req.body.city || doctor.city;
    doctor.state = req.body.country || doctor.state;
    doctor.specialization = req.body.specialization || doctor.specialization;
    doctor.headline = req.body.headline || doctor.headline;
    doctor.bio = req.body.bio || doctor.bio;
    doctor.experience = req.body.experience || doctor.experience;
    if (req.body.password) {
      // doctor.password = req.body.password;
    }

    const updatedDoctor = await doctor.save();

    res.json({
      _id: updatedDoctor._id,
      name: updatedDoctor.name,
      email: updatedDoctor.email,
      dob: updatedDoctor.dateofbirth,
      gender: updatedDoctor.gender,
      phone: updatedDoctor.phone,
      address: updatedDoctor.address,
      city: updatedDoctor.address,
      country: updatedDoctor.state,
      specialization: updatedDoctor.specialization,
      headline: updatedDoctor.headline,
      bio: updatedDoctor.bio,
      experience: updatedDoctor.experience
    });
  } else {
    res.status(404);
    throw new Error('Doctor not found');
  }
});




export {
  authDoctor,
  getDoctors,
  registerDoctor,
  logoutDoctor,
  getDoctorProfile,
  getDoctorById,
  getDoctorByUserId,
  updateDoctorProfile,
};
