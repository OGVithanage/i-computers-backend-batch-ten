import Student from "../models/student.js"

export function createStudent(req, res) {
    if (req.user == null) {
        res.json({
            message: "Unauthorized acsess you need to login before creting students."
        })
        return;
    }

    const newStudent = new Student({
        name: req.body.name,
        age: req.body.age,
        city: req.body.city
    })

    newStudent.save().then(
        () => res.json(
            {
                message: "Student Created Successfully"
            }
        )
    )
}

export function getStudents(req, res) {
    Student.find().then(
        (result) => {
            res.json(result)
        }
    )
}
