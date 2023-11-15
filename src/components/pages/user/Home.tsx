import React from "react";
import Header from "../../organisms/Header";
import Banner from "../../organisms/Banner";
import CourseList from "../../organisms/CourseList";

type Props = {};

const Home = (props: Props) => {
	return (
		<>
			<Header />
			<Banner />
			<CourseList />
		</>
	);
};

export default Home;
