import './SearchModal.css';
import React, { useEffect, useState } from "react";
import { faClose, faMagnifyingGlassArrowRight, faSearch, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { useAppSelector } from '../../app/hooks';
import { ProductCategory } from '../../interfaces/ProductsInterfaces';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../helpers';

interface SearchModalProps {
  open: Boolean;
  onClose: any;
};

const SearchModal = (props: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quickSearchResults, setQuickSearchResults] = useState<any[]>([]);
  const [quickSearchResultsSelectedIndex, setQuickSearchResultsSelectedIndex] = useState<number>(-1);
  const searchInputElRef = React.useRef<HTMLInputElement>(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (props.open) {
      // focus search input
      setTimeout(() => {
        if (searchInputElRef.current) {
          searchInputElRef.current.focus();
        }
      });
    }
  }, [props.open]);

  let makeSearchTimeout: any;
  useEffect(() => {
    if (searchQuery.trim().length > 2) {
      clearTimeout(makeSearchTimeout);
      makeSearchTimeout = setTimeout(() => {
        quickSearch();
      }, 300);
    } else {
      setQuickSearchResults([]);
    }
  }, [searchQuery]);

  const closeModal = () => {
    setSearchQuery('');
    setQuickSearchResults([]);
    setQuickSearchResultsSelectedIndex(-1);
    props.onClose();
  };

  const onSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const onInputKeyDown = (e: any) => {
    if (e.key === 'ArrowDown') {
      if (quickSearchResultsSelectedIndex < quickSearchResults.length) {
        setQuickSearchResultsSelectedIndex(quickSearchResultsSelectedIndex + 1);
      } else {
        setQuickSearchResultsSelectedIndex(0);
      }
    } else if (e.key === 'ArrowUp') {
      if (quickSearchResultsSelectedIndex > 0) {
        setQuickSearchResultsSelectedIndex(quickSearchResultsSelectedIndex - 1);
      } else {
        setQuickSearchResultsSelectedIndex(quickSearchResults.length);
      }
    } else if (e.key === 'Enter') {
      if (quickSearchResultsSelectedIndex > -1) {
        chooseSearchResult(quickSearchResultsSelectedIndex);
      } else {
        chooseSearchResult(0);
      }
    }
  };

  const chooseSearchResult = (resultIndex: number) => {
    if (resultIndex === 0) {
      navigate(`/search/${searchQuery}`);
    } else {
      const result = quickSearchResults[resultIndex - 1];

      if ('name' in result) {
        navigate(`/products/${result.id}`);
      } else if ('title' in result) {
        navigate(`/product/${result.id}`)
      }
    }

    closeModal();
  };

  /**
   * remove this when you setup the server
   */
  const products = useAppSelector((state) => state.products.productListItems);
  const categories = useAppSelector((state) => state.products.categories);
  // end of remove this
  
  const quickSearch = () => {
    axios.get(`http://localhostt/eshop-server/quick-search`).then((response) => {
      /*
        server response should be a JSON array as the example below
        [
          {
            "id": 1,
            "name": "Headphones",
          },
          {
            "id": 2,
            "image": "headphones-front-image.jpeg",
            "title": "Red Headphones",
          },
        ]
      */
      setQuickSearchResults(response.data);
    }).catch((err) => {
      /**
       * remove this when you setup the server
       */
      const categoryResults = categories
        .filter((c: ProductCategory) => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .map((c: ProductCategory) => {
          return {
            id: c.id,
            name: c.name,
          };
        });
      const productResults = products
        .filter((p: any) => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .map((p: any) => {
          return {
            id: p.id,
            image: p.images[0],
            title: p.title,
          }
        });
      setQuickSearchResults([
        ...categoryResults,
        ...productResults,
      ]);
      // end of remove this
    });
  };

  return (
    <div className={`SearchModal ${props.open ? '' : 'd-none'}`}>
      <button className="btn-close" onClick={closeModal}>
        <FontAwesomeIcon icon={faClose} size="3x" />
      </button>
      
      <div className="search-container">
        <FontAwesomeIcon icon={faSearch} size="lg" />

        <input
          type="text"
          placeholder="Search"
          className={`${quickSearchResults.length > 0 ? 'with-autocomplete' : ''}`}
          ref={searchInputElRef}
          onChange={onSearchQueryChange}
          value={searchQuery}
          onKeyDown={onInputKeyDown}></input>

        <div
          className={`autocomplete ${quickSearchResults.length > 0 ? '' : 'd-none'}`}
        >
          {
            searchQuery.trim().length > 2
              ? <div
                  className={`autocomplete__search-result ${quickSearchResultsSelectedIndex === 0 ? 'selected' : ''}`}
                  onClick={() => chooseSearchResult(0)}
                >
                  <FontAwesomeIcon icon={faMagnifyingGlassArrowRight} size="lg"/>
                  <span>Search for "{searchQuery}"</span>
                </div>
              : ''
          }
          {
            quickSearchResults.map((result: any, i: number) => {
              let resultItemEl;
              if ('name' in result) {
                // is a category result
                resultItemEl = (
                  <div
                    className={`autocomplete__search-result ${quickSearchResultsSelectedIndex === i + 1 ? 'selected' : ''}`}
                    onClick={() => chooseSearchResult(i + 1)}
                  >
                    <FontAwesomeIcon icon={faTag} size="lg"/>
                    <span>Search in category {result.name}</span>
                  </div>
                );
              } else if ('title' in result) {
                // is a product result
                resultItemEl = (
                  <div
                    className={`autocomplete__search-result ${quickSearchResultsSelectedIndex === i + 1 ? 'selected' : ''}`}
                    onClick={() => chooseSearchResult(i + 1)}
                  >
                    <img src={`${baseUrl}assets/images/${result.image}`} height="40"></img>
                    <span>{result.title}</span>
                  </div>
                );
              }
              return resultItemEl;
            })
          }
        </div>
      </div>

      <span style={{width: '400px', marginTop: '50px', color: '#FFFFFF'}}>Try searching for "Headphones" or "Microphone"</span>
    </div>
  );
};

export default SearchModal;