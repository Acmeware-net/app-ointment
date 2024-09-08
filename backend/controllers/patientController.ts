import asyncHandler from 'express-async-handler';
import Patient from '../models/patientModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth patient & get token
// @route   POST /api/patients/auth
// @access  Public
const authPatient = asyncHandler(async (req: any, res: any) => {
  const { email, password } = req.body;
  console.log(`email : ${email}`)
  const patient = await Patient.findOne({ email });
  // @ts-ignore
  if (patient && (await patient.matchPassword(password))) {
    generateToken(res, patient._id);

    res.json({
      _id: patient._id,
      name: patient.name,
      email: patient.email,
      age: patient.age,
      gender: patient.gender,
      phone: patient.phone,
      address: patient.address,
      headline: patient.headline,
      description: patient.description,
      specialization: patient.specialization,
      experience: patient.experience,
      city: patient.city,
      country: patient.country,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new patient
// @route   POST /api/patients
// @access  Public
const registerPatient = asyncHandler(async (req: any, res: any) => {
  const { name, email, password, age, gender, phone, address, headline, description, specialization, experience, city, country } = req.body;

  const patientExists = await Patient.findOne({ email });

  if (patientExists) {
    res.status(400);
    throw new Error('patient already exists');
  }

  const patient = await Patient.create({
    name,
    email,
    password,
    age,
    gender,
    phone,
    address,
    headline,
    description,
    specialization,
    experience,
    city,
    country,
  });

  if (patient) {
    generateToken(res, patient._id);

    res.status(201).json({
      _id: patient._id,
      name: patient.name,
      email: patient.email,
      age: patient.age,
      gender: patient.gender,
      phone: patient.phone,
      address: patient.address,
      headline: patient.headline,
      description: patient.description,
      specialization: patient.specialization,
      experience: patient.experience,
      city: patient.city,
      country: patient.country,
    });
  } else {
    res.status(400);
    throw new Error('Invalid patient data');
  }
});

// @desc    Logout patient / clear cookie
// @route   POST /api/patients/logout
// @access  Public
const logoutPatient = (req: any, res: any) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get patient profile
// @route   GET /api/patients/profile
// @access  Private
const getPatientProfile = asyncHandler(async (req: any, res: any) => {
  const patient = await Patient.findById(req.patient._id);
  console.log(`Patient id: ${req.patient._id}`);
  if (patient) {
    res.json({
      _id: patient._id,
      name: patient.name,
      email: patient.email,
      age: patient.age,
      gender: patient.gender,
      phone: patient.phone,
      address: patient.address,
      headline: patient.headline,
      description: patient.description,
      specialization: patient.specialization,
      experience: patient.experience,
      city: patient.city,
      country: patient.country,
    });
  } else {
    res.status(404);
    throw new Error('patient not found');
  }
});

// @desc    Update patient profile
// @route   PUT /api/patients/profile
// @access  Private
const updatePatientProfile = asyncHandler(async (req: any, res: any) => {
  const patient = await Patient.findById(req.patient._id);

  if (patient) {
    patient.name = req.body.name || patient.name;
    patient.email = req.body.email || patient.email;
    patient.age = req.body.age || patient.age;
    patient.gender = req.body.gender || patient.gender;
    patient.phone = req.body.phone || patient.phone;
    patient.address = req.body.address || patient.address;
    patient.headline = req.body.headline || patient.headline;
    patient.description = req.body.description || patient.description;
    patient.specialization = req.body.specialization || patient.specialization;
    patient.experience = req.body.experience || patient.experience;
    patient.city = req.body.city || patient.city;
    patient.country = req.body.country || patient.country;

    if (req.body.password) {
      patient.password = req.body.password;
    }

    const updatedpatient = await patient.save();

    res.json({
      _id: updatedpatient._id,
      name: updatedpatient.name,
      email: updatedpatient.email,
      age: updatedpatient.age,
      gender: updatedpatient.gender,
      phone: updatedpatient.phone,
      address: updatedpatient.address,
      headline: updatedpatient.headline,
      description: updatedpatient.description,
      specialization: updatedpatient.specialization,
      experience: updatedpatient.experience,
      city: updatedpatient.city,
      country: updatedpatient.country,
    });
  } else {
    res.status(404);
    throw new Error('patient not found');
  }
});
export {
  authPatient,
  registerPatient,
  logoutPatient,
  getPatientProfile,
  updatePatientProfile,
};
