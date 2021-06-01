interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CoursePartWithDescription extends CoursePartBase{
    description: string,
}

interface CourseNormalPart extends CoursePartWithDescription {
    type: "normal";
}
  
interface CourseSubmissionPart extends CoursePartWithDescription {
    type: "submission";
    exerciseSubmissionLink: string;
}
  
 export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart;