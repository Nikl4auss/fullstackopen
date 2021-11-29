import Header from "./course_components/Header";
import Content from "./course_components/Content";
import Total from "./course_components/Total";
const Course = ({ course }) => {
  return (
    <section>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total
        total={course.parts.reduce((acc, part) => acc + part.exercises, 0)}
      />
    </section>
  );
};

export default Course;
