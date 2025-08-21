const Booking = require("../models/Booking"); //booking model
const Course = require("../models/course");  //course model

class BookingController {
    static createBooking = async (req,res) => {
        try{
            const{courseId}=req.params;
            const userID = req.user._id; //assume JWT middleware
            const course = await Course.findById(courseId);

            if (!course) {
                return res.status(400).json({message: "Course not found"});
            }
            const newBooking = await Booking.create({
                course:course._id,
                user:userID,
                price:course.price,
            });
            return res.status(200).json({
                message: "Booking created successfully",
                booking: newBooking,
            });
        }catch(err){
            console.log(err);
            return res.status(500).json({message: "Server Error"});
        }
    };
    //static arrow function to get user booking
    static getUserBookings= async (req,res) => {
        try{
            const userID = req.user._id;
            const booking = await Booking.find({user:userId})
                .populate("course","title price")
                .sort({createdAt:-1});
            return res.status(200).json({booking});
        }catch(error){
            console.error(error);
            return res.status(500).json({message: "Server Error"});
        }
    };

    //Static arrow function to cancle booking
    static cancleBooking = async (req,res) => {
        try{
            const{bookingId}=req.params;
            const booking = await Booking.findByIdAndUpdate(
                bookingId,
                {status:"Cancelled"},
                {new: true}
            );
            if (!booking) {
                return res.status(404).json({message: "Booking not found"});
            }
            return res.status(200).json({
                message: "Booking cancelled successfully",
                booking,
            });
        }catch(error){
            console.error(error);
            return res.status(500).json({message: "Server Error"});
        }
    };
    static getAllBookings = async (req,res) => {
        try{
            const Bookings = await Booking.find()
                .populate("user","name email")
                .populate("course","title price")
                .sort({createdAt:-1});

            //Format response
            const formatted = bookings.map(b => ({
                id:b.id,
                username:b.user.name,
                userEmail:b.user.email,
                courseTitle:b.course.title,
                price:b.course.price,
                status:b.course.status,
                createdAt:b.course.createdAt
            }));
            res.status(200).json(formatted)
        }catch(err){
            console.error(err);
            res.status(500).json({message: "Server Error"});
        }
    };
}


module.exports = BookingController;