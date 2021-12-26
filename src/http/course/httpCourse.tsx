import { HttpAxiosCourseBase } from "../httpAxiosCourse";
import { Course } from "types/course/courseType";
import { ResponseBase } from "types/reponses/responsesType";

export const HttpCourse = {
    getListCourses: () : Promise<ResponseBase<Course[]>> => {
        return HttpAxiosCourseBase.get(`courses`);
    },
}