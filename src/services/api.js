import axios from "axios";
import { configJson } from "./config";

const { oauthUrl, projectsUrl, publicationsUrl, clientId, clientSecret } =
  configJson;

/**
 * get auth token
 * @returns token
 */
export const getToken = async () => {
  try {
    const response = await axios.post(oauthUrl, {
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

/**
 *
 * @param {string} token use the token retrived from the authorization
 * @returns a list of projects
 */
export const getProjects = async (token) => {
  try {
    const response = await axios.get(projectsUrl, {
      params: {
        limit: 100,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

/**
 *
 * @param {string} token use the token retrived from the authorization
 * @returns a list of all publications
 */
export const getAllPublications = async (token) =>
  new Promise((resolve, reject) => {
    axios
      .get(publicationsUrl, {
        params: {
          limit: 100,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        let { edition } = data._embedded;

        /**
         * If there are more than 100 publications, this function will
         * keep retriving date until we get all publications.
         *
         * With the help of the _link, it checks if the last link match,
         * if so it means that all publications are aready retrived from the endpoint.
         *
         * This will reduce the amount of calls to the endpoint since is limited to 1k per hour
         * @param {string} link next link
         * @returns a list of all publications
         */
        const getEdition = (link) => {
          axios
            .get(link, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              const { _links, _embedded } = response.data;
              edition = [...edition, ..._embedded.edition];

              if (_links.self.href !== _links.last.href) {
                getEdition(response.data._links.next.href);
              } else {
                resolve(edition);
              }
            });
        };

        // This checks if the last link match,
        // if so it means that all publications are aready retrived from the endpoint.
        if (data._links.self.href !== data._links.last.href) {
          getEdition(data._links.next.href);
        } else {
          resolve(edition);
        }
      })
      .catch((error) => reject(error));
  });
