require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const mongoose = require("mongoose");
const connectDB = require("../config/db");

const Admin = require("../models/Admin");
const Service = require("../models/Service");
const Equipment = require("../models/Equipment");
const Gallery = require("../models/Gallery");
const Project = require("../models/Project");
const Training = require("../models/Training");

const { services, equipment, projects, gallery, training } = require("./seedData");

const run = async () => {
  await connectDB();

  console.log("Clearing existing dynamic content...");
  await Promise.all([
    Service.deleteMany({}),
    Equipment.deleteMany({}),
    Gallery.deleteMany({}),
    Project.deleteMany({}),
    Training.deleteMany({}),
  ]);

  console.log("Seeding equipment...");
  const createdEquipment = await Equipment.insertMany(equipment);

  console.log("Seeding services...");
  const createdServices = [];
  for (const s of services) {
    const created = await Service.create(s);
    createdServices.push(created);
  }

  console.log("Seeding projects...");
  const createdProjects = await Project.insertMany(projects);

  console.log("Seeding gallery...");
  const galleryWithRelations = gallery.map((g, i) => ({
    ...g,
    project: createdProjects[i % createdProjects.length]._id,
  }));
  const createdGallery = await Gallery.insertMany(galleryWithRelations);

  // Link a couple of relationships to demonstrate the SRS relational model
  if (createdServices[0] && createdEquipment.length) {
    createdServices[0].relatedEquipment = [createdEquipment[0]._id, createdEquipment[1]._id, createdEquipment[2]._id];
    createdServices[0].relatedGallery = [createdGallery[0]._id];
    await createdServices[0].save();
  }
  if (createdServices[5] && createdEquipment.length > 4) {
    createdServices[5].relatedEquipment = [createdEquipment[3]._id, createdEquipment[4]._id];
    createdServices[5].relatedGallery = [createdGallery[1]._id];
    await createdServices[5].save();
  }
  if (createdEquipment[0]) {
    createdEquipment[0].relatedServices = [createdServices[0]._id];
    await createdEquipment[0].save();
  }

  console.log("Seeding training...");
  await Training.insertMany(training);

  console.log("Seeding admin account...");
  const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
  if (!existingAdmin) {
    await Admin.create({
      name: "BIX Administrator",
      email: process.env.ADMIN_EMAIL || "admin@bixndt.com",
      password: process.env.ADMIN_PASSWORD || "ChangeMe123!",
    });
    console.log(`Admin account created: ${process.env.ADMIN_EMAIL || "admin@bixndt.com"}`);
  } else {
    console.log("Admin account already exists, skipping.");
  }

  console.log("Seeding complete.");
  mongoose.connection.close();
  process.exit(0);
};

run().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
