import React, { useEffect, useRef, useState, forwardRef } from "react";

const commonClasses = `dark:text-white text-primary dark:border-dark-subtle
border-light-subtle dark:focus:border-white focus:border-primary
transition outline-none w-full bg-transparent dark:bg-transparent`;

export default function LiveSearch({
  value = "",
  placeholder = "",
  results = [],
  name,
  resultContainerStyle,
  selectedResultStyle,
  inputStyle,
  renderItem = null,
  onChange = null,
  onSelect = null,
  visible,
}) {
  const [displaySearch, setDisplaySearch] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const handleOnFocus = () => {
    if (results.length) setDisplaySearch(true);
  };

  const closeSearch = () => {
    setDisplaySearch(false);
    setFocusedIndex(-1);
  };

  const handleOnBlur = () => {
    closeSearch();
  };

  const handleSelection = (selectedItem) => {
    if (selectedItem) {
      onSelect(selectedItem);
      closeSearch();
    }
  };

  const handleKeyDown = ({ key }) => {
    let nextCount;
    const keys = ["ArrowDown", "ArrowUp", "Enter", "Escape"];
    if (!keys.includes(key)) return;

    // move selection up and down
    if (key === "ArrowDown") {
      nextCount = (focusedIndex + 1) % results.length;
    }
    if (key === "ArrowUp") {
      nextCount = (focusedIndex + results.length - 1) % results.length;
    }

    if (key === "Escape") return closeSearch();

    if (key === "Enter") return handleSelection(results[focusedIndex]);

    setFocusedIndex(nextCount);
  };

  const getInputStyle = () => {
    return inputStyle
      ? inputStyle
      : commonClasses + " border-2 rounded p-1 text-lg";
  };

  const handleChange = (e) => {
    onChange(e);
  };

  useEffect(() => {
    if (visible) return setDisplaySearch(visible);
    setDisplaySearch(false);
  }, [visible]);

  return (
    <div
      tabIndex={1}
      onKeyDown={handleKeyDown}
      onBlur={handleOnBlur}
      className="relative outline-none"
    >
      <input
        // onClick={() => {
        //   setDisplaySearch(!displaySearch);
        // }}
        type="text"
        id={name}
        name={name}
        className={getInputStyle()}
        placeholder={placeholder}
        onFocus={handleOnFocus}
        value={value}
        onChange={handleChange}
      />
      <SearchResults
        results={results}
        visible={displaySearch}
        focusedIndex={focusedIndex}
        onSelect={handleSelection}
        renderItem={renderItem}
        resultContainerStyle={resultContainerStyle}
        selectedResultStyle={selectedResultStyle}
      />
    </div>
  );
}

const SearchResults = ({
  visible,
  results = [],
  focusedIndex,
  onSelect,
  renderItem,
  resultContainerStyle,
  selectedResultStyle,
}) => {
  const resultContainer = useRef();

  useEffect(() => {
    resultContainer?.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [focusedIndex]);

  if (!visible || !results.length) return null;

  return (
    <div className="absolute z-50 right-0 left-0 top-10 bg-white dark:bg-secondary shadow-md p-2 max-h-64 space-y-2 mt-1 overflow-auto custom-scroll-bar">
      {results.map((result, index) => {
        const getSelectedClass = () => {
          return selectedResultStyle
            ? selectedResultStyle
            : "dark:bg-dark-subtle bg-light-subtle";
        };
        return (
          <ResultCard
            ref={index === focusedIndex ? resultContainer : null}
            key={result._id}
            item={result}
            renderItem={renderItem}
            resultContainerStyle={resultContainerStyle}
            selectedResultStyle={
              index === focusedIndex ? getSelectedClass() : ""
            }
            onMouseDown={() => onSelect(result)}
          />
        );
      })}
    </div>
  );
};

const ResultCard = forwardRef((props, ref) => {
  const {
    item,
    renderItem,
    resultContainerStyle,
    selectedResultStyle,
    onMouseDown,
  } = props;

  const getClasses = () => {
    if (resultContainerStyle)
      return resultContainerStyle + " " + selectedResultStyle;

    return (
      selectedResultStyle +
      " cursor-pointer rounded overflow-hidden dark:hover:bg-dark-subtle hover:bg-light-subtle transition"
    );
  };
  return (
    <div onMouseDown={onMouseDown} ref={ref} className={getClasses()}>
      {renderItem(item)}
    </div>
  );
});
