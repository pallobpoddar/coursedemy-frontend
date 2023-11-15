import React from "react";
import Header from "../../organisms/Header";
import Banner from "../../organisms/Banner";
import CourseList from "../../organisms/CourseList";

type Props = {};

const HomePage = (props: Props) => {
	return (
		<>
			<Header />
			<Banner />
			<CourseList />
		</>
	);
};

export default HomePage;
