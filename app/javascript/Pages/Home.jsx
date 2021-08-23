import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Head } from "@inertiajs/inertia-react";
import { useState, useEffect } from "react";
import SocialCard from "./components/SocialCard";
import "../stylesheets/home.scss";
import ButtonDifficultyFilter from "./components/ButtonDifficultyFilter";
import CardCategory from "./components/CardCategory";
import CardPopular from "./components/CardPopular";
import axios from "axios";
import ButtonFilter from "./components/ButtonFilter";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

function Homepage(props) {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [cats, setCat] = useState([]);
  const [pclasses, setPClasses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");

  const fetchClassesDifficulty = async (difficulty) => {
    let newClassData = [];
    axios
      .get(`/api/classes?difficulty=${difficulty}`)
      .then((response) => {
        newClassData = response.data;
        setItems(newClassData);
      })
      .catch((error) => {
        console.log(error);
        newClassData = [];
      });
  };

  const fetchCategories = async () => {
    let categoryData = [];
    axios
      .get("/api/skills")
      .then((response) => {
        categoryData = response.data;
        setCat(categoryData);
      })
      .catch((error) => {
        console.log(error);
        categoryData = [];
      });
  };

  const fetchPopularClasses = async () => {
    let popularClassData = [];
    axios
      .get("/api/classes")
      .then((response) => {
        popularClassData = response.data;
        setPClasses(popularClassData);
      })
      .catch((error) => {
        console.log(error);
        popularClassData = [];
      });
  };

  const addCategoryButtons = async () => {
    let categories = [];
    axios
      .get(`/api/skills`)
      .then((response) => {
        categories = response.data;

        setCategories(categories);
      })
      .catch((error) => {
        console.log(error);
        categories = [];
      });
  };

  const fetchClasses = async () => {
    const params = new URLSearchParams();

    if (categoryFilter) {
      params.append("category_id", categoryFilter);
    }

    let url = "/api/classes";

    if (params.toString()) {
      url += "?" + params.toString();
    }
    let classes = [];
    axios
      .get(url)
      .then((response) => {
        classes = response.data;

        setPClasses(classes);
      })
      .catch((error) => {
        classes = [];
      });
  };

  const updateCategory = (category) => {
    if (category) setCategoryFilter(category);
    else {
      setCategoryFilter("");
    }
  };

  useEffect(() => {
    fetchClassesDifficulty("beginner");
    fetchCategories();
    fetchPopularClasses();
    addCategoryButtons();
  }, []);

  useEffect(() => {
    fetchClasses();
  }, [categoryFilter]);

  return (
    <main>
      <Head title="Welcome" />
      <Navbar current_user={props.current_user} />
      <div className="hero-img">
        <h1 className="hero-title">{t("hero-title")}</h1>
      </div>
      <div className="new-classes">
        <h1 className="home-title">{t("first-title")}</h1>

        <div className="filter-wrapper">
          <ButtonDifficultyFilter
            props={{
              onClick: fetchClassesDifficulty,
              difficulty: "beginner",
            }}
          >
            Beginner
          </ButtonDifficultyFilter>
          <ButtonDifficultyFilter
            props={{
              onClick: fetchClassesDifficulty,
              difficulty: "intermediate",
            }}
          >
            Intermediate
          </ButtonDifficultyFilter>
          <ButtonDifficultyFilter
            props={{
              onClick: fetchClassesDifficulty,
              difficulty: "advanced",
            }}
          >
            Advanced
          </ButtonDifficultyFilter>
        </div>

        <div className="new-classes-wrapper">
          {items.map((item, index) => {
            return <SocialCard newClassData={item} key={index} />;
          })}
        </div>
      </div>

      <div className="categories">
        <h1 className="home-title">{t("second-title")}</h1>

        <div className="categories-wrapper">
          {cats.map((cat, index) => {
            return <CardCategory categoryData={cat} key={index} />;
          })}
        </div>
      </div>

      <div className="popular">
        <h1 className="home-title">Most Popular</h1>

        <div className="filter-wrapper">
          <ButtonFilter
            props={{
              onClick: updateCategory,
              params: "",
              id: categoryFilter,
              key: "",
            }}
          >
            All categories
          </ButtonFilter>
          {categories.map((c, index) => {
            return (
              <ButtonFilter
                props={{
                  onClick: updateCategory,
                  params: c.id,
                  id: categoryFilter,
                  key: index,
                }}
              >
                {c.name}
              </ButtonFilter>
            );
          })}
        </div>

        <div className="popular-wrapper">
          {pclasses.map((pclass, index) => {
            return <CardPopular popularClassData={pclass} key={index} />;
          })}
        </div>
      </div>

      <Footer />
    </main>
  );
}

Homepage.propTypes = {
  current_user: PropTypes.object.isRequired,
};

export default Homepage;
