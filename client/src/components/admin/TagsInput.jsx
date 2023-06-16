import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const TagsInput = ({ onChange, name }) => {
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");
  const scrollRef = useRef();
  const tagsRef = useRef();

  const handleChange = ({ target }) => {
    const { value } = target;
    if (value !== ",") setTag(value);
  };

  const handleKey = ({ key }) => {
    if (key === "Enter" || key === ",") {
      if (!tag) {
        return;
      }
      if (tags.includes(tag)) return setTag("");
      setTags([...tags, tag]);
      setTag("");
    }

    if (key === "Backspace" && !tag && tags.length) {
      const newTags = tags.filter((_, index) => index !== tags.length - 1);
      setTags([...newTags]);
    }
  };

  const handleRemove = (event, tagToRemove) => {
    if (event.clientX === 0 && event.clientY === 0) return;
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags([...newTags]);
  };

  const handleOnFocus = () => {
    tagsRef.current.classList.remove(
      "dark:border-dark-subtle",
      "border-light-subtle"
    );
    tagsRef.current.classList.add("dark:border-white", "border-primary");
  };

  const handleOnBlur = () => {
    tagsRef.current.classList.add(
      "dark:border-dark-subtle",
      "border-light-subtle"
    );
    tagsRef.current.classList.remove("dark:border-white", "border-primary");
  };

  useEffect(() => {
    scrollRef?.current.scrollIntoView({ behavior: "smooth" });
  }, [tag]);

  useEffect(() => {
    if (tags.length) {
      onChange(tags);
    }
  }, [tags]);

  return (
    <div
      onKeyDown={handleKey}
      ref={tagsRef}
      className="custom-scrollbar overflow-x-auto border-2 transition-all bg-transparent dark:bg-transparent px-2 h-10 rounded w-full text-white flex items-center space-x-2"
    >
      {tags.map((tag) => (
        <Tag onClick={(event) => handleRemove(event, tag)} key={tag}>
          {tag}
        </Tag>
      ))}

      <input
        id={name}
        ref={scrollRef}
        onChange={handleChange}
        type="text"
        value={tag}
        className="h-full flex-grow dark:text-white bg-transparent outline-none"
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
    </div>
  );
};

export default TagsInput;

const Tag = ({ children, onClick }) => (
  <span className="whitespace-nowrap dark:bg-white bg-primary dark:text-primary text-white flex items-center px-1 text-sm">
    {children}
    <button type="button" onClick={onClick}>
      <AiOutlineClose size={12} />
    </button>
  </span>
);
