import asyncHandler from 'express-async-handler';
import Doctor from '../models/doctorModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth doctor & get token
// @route   POST /api/doctors/auth
// @access  Public
const authDoctor = asyncHandler(async (req: any, res: any) => {
  const { email, password } = req.body;
  console.log(email);
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
  const { name, email, password, age, gender, phone, address } = req.body;

  const doctorExists = await Doctor.findOne({ email });

  if (doctorExists) {
    res.status(400);
    throw new Error('Doctor already exists');
  }

  const doctor = await Doctor.create({
    name,
    email,
    password,
    age,
    gender,
    phone,
    address
  });

  if (doctor) {
    generateToken(res, doctor._id);

    res.status(201).json({
      _id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      age: doctor.age,
      gender: doctor.gender,
      phone: doctor.phone,
      address: doctor.address,
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

  if (doctor) {
    res.json({
      _id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      age: doctor.age,
      gender: doctor.gender,
      phone: doctor.phone,
      address: doctor.address,
    });
  } else {
    res.status(404);
    throw new Error('Doctor not found');
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
    doctor.age = req.body.age || doctor.age;
    doctor.gender = req.body.gender || doctor.gender;
    doctor.phone = req.body.phone || doctor.phone;
    doctor.address = req.body.address || doctor.address;
    
    if (req.body.password) {
      doctor.password = req.body.password;
    }

    const updatedDoctor = await doctor.save();

    res.json({
      _id: updatedDoctor._id,
      name: updatedDoctor.name,
      email: updatedDoctor.email,
      age: updatedDoctor.age,
      gender: updatedDoctor.gender,
      phone: updatedDoctor.phone,
      address: updatedDoctor.address,
    });
  } else {
    res.status(404);
    throw new Error('Doctor not found');
  }
});
export {
  authDoctor,
  registerDoctor,
  logoutDoctor,
  getDoctorProfile,
  updateDoctorProfile,
};
