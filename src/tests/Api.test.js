import axios from "axios";
import { getToken, getProjects, getAllPublications } from "../services/api";

jest.mock("axios");

test("Fetch token", async () => {
  const access_token = [{ access_token: "1234567890" }];
  const resp = { data: access_token };
  axios.post.mockImplementationOnce(() => Promise.resolve(resp));

  await expect(getToken()).resolves.toEqual(access_token);
});

test("Fetch products", async () => {
  const _embedded = [
    {
      title: [
        {
          id: 64673,
          name: "Ebooks",
          identifier: "ebooks",
          hostname: null,
          created_on: "2020-11-04 11:27:20",
          modified_on: null,
          affected_on: "2020-11-04 11:31:50",
        },
        {
          id: 1233,
          name: "Ebooks",
          identifier: "ebooks",
          hostname: null,
          created_on: "2020-11-04 11:27:20",
          modified_on: null,
          affected_on: "2020-11-04 11:31:50",
        },
      ],
    },
  ];
  const resp = { data: _embedded };
  axios.get.mockImplementationOnce(() => Promise.resolve(resp));

  await expect(getProjects()).resolves.toEqual(_embedded);
});

test("Fetch all publications", async () => {
  const data = {
    _links: {
      self: {
        href: "https://api.foleon.com/v2/magazine/edition?page=1",
      },
      first: {
        href: "https://api.foleon.com/v2/magazine/edition",
      },
      last: {
        href: "https://api.foleon.com/v2/magazine/edition?page=1",
      },
      next: {
        href: "https://api.foleon.com/v2/magazine/edition?page=1",
      },
    },
    _embedded: {
      edition: [
        {
          name: "Why Content Experiences? (copy 1)",
          identifier: "why-content-experiences",
          published_on: null,
          affected_on: "2020-11-04 11:39:27",
          first_published_on: null,
          status: "draft",
          has_header: null,
        },
        {
          name: "Buyer Enablement In 2020 (copy 1)",
          identifier: "buyer-enablement-in-2020",
          published_on: null,
          affected_on: "2020-11-04 11:39:25",
          first_published_on: null,
          status: "draft",
          has_header: null,
        },
      ],
    },
  };
  const resp = { data: data };
  axios.get.mockImplementationOnce(() => Promise.resolve(resp));

  await expect(getAllPublications()).resolves.toEqual(data._embedded.edition);
});
