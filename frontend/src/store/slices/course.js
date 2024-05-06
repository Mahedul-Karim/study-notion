import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  existingCourse: null,
  newCourse: null,
  viewCourse:{
    progress:null,
    course:null,
    selectedSection:0,
    selectedSubSection:0
  }
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    getAllCourse(state, action) {
      state.existingCourse = action.payload;
    },
    addNewCourse(state, action) {
      state.newCourse = action.payload;
    },
    editCourse(state, action) {
      state.newCourse = { ...state.newCourse, ...action.payload };
    },
    addSection(state, action) {
      state.newCourse.courseContents.push(action.payload);
    },
    editSection(state, action) {
      const { index, name } = action.payload;
      state.newCourse.courseContents[index].sectionName = name;
    },
    deleteSection(state, action) {
      state.newCourse.courseContents.splice(action.payload, 1);
    },
    editSubSection(state, action) {
      const { index, sectionName, ...data } = action.payload;

      const existingSection = state.newCourse.courseContents.find(
        (sec) => sec.sectionName === sectionName
      );

      if (existingSection) {
        existingSection.subSection[index] = data;
      }
    },
    removeSubSection(state,action){
      const { index, sectionName } = action.payload;

      const existingSection = state.newCourse.courseContents.find(
        (sec) => sec.sectionName === sectionName
      );

      existingSection.subSection.splice(index,1)
    },
    addSubSection(state, action) {
      const { sectionName, title, description, videoUrl,_id } = action.payload;

      const existingSection = state.newCourse.courseContents.find(
        (sec) => sec.sectionName === sectionName
      );

      if (existingSection) {
        existingSection.subSection.push({
          title,
          description,
          videoUrl,
          _id
        });
      }
    },
    setViewCourse(state,action){
      const { progress,course } = action.payload;
      state.viewCourse.progress = progress;
      state.viewCourse.course = course;
    },
    setSection(state,action){
      state.viewCourse.selectedSection = action.payload;
    },
    setSubSection(state,action){
      state.viewCourse.selectedSubSection = action.payload;
    },
    setVideoProgress(state,action){
      state.viewCourse.progress.completedVideos.push(action.payload);
    },
    setSectionProgress(state,action){
      state.viewCourse.progress.completedSections.push(action.payload);
    }
  },
});

export const {
  getAllCourse,
  addNewCourse,
  addSection,
  addSubSection,
  editCourse,
  editSection,
  deleteSection,
  editSubSection,
  removeSubSection,
  setViewCourse,
  setSection,
  setSubSection,
  setVideoProgress,
  setSectionProgress
} = courseSlice.actions;
export default courseSlice.reducer;
