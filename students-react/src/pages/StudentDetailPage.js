import React from "react";
import { useParams } from "react-router-dom";
import StudentList from "../components/StudentList";
import NotFoundPage from "./NotFoundPage";
import AddStudentForm from "../components/AddStudentForm";
import { useState, useEffect } from "react";
import BASE_URL from "../data/config";

const StudentDetailPage = () => {
  const { id } = useParams();
  //   const student = students.find((data) => data.studentId === Number(id));

  const [studentInfo, setStudentInfo] = useState({
    FirstName: "",
    LastName: "",
    School: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`${BASE_URL}students/${id}`);
      const body = await result.json();
      //console.log(body);
      setStudentInfo(body);
    };
    fetchData();
  }, [id]);

  if (!studentInfo) return <NotFoundPage />;
  return (
    <React.Fragment>
      <p style={{ width: "20%", float: "right" }}>
        <h3>Others:</h3>
        <StudentList exceptId={studentInfo.StudentId} />
      </p>

      <h4 className="text-danger">Student ID={studentInfo.StudentId}</h4>
      <p>
        <b>Name: </b>
        {studentInfo.FirstName} {studentInfo.LastName}
      </p>
      <p>
        <b>School: </b>
        {studentInfo.School}
      </p>
      <div style={{ width: "50%", float: "left" }}>
        <AddStudentForm />
      </div>
    </React.Fragment>
  );
};

export default StudentDetailPage;
