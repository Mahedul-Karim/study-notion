import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  existingCourse: null,
  newCourse: null,
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
  removeSubSection
} = courseSlice.actions;
export default courseSlice.reducer;
