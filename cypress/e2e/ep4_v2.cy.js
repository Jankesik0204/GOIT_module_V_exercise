describe("Testy dla API https://httpbin.org/", () => {
  // Test 1: Sprawdź odpowiedź dla GET na /get
  it("Test GET na /get", () => {
    // Wykonaj żądanie GET na /get
    cy.request("https://httpbin.org/get").should((response) => {
      // Sprawdź, czy status odpowiedzi wynosi 200
      expect(response.status).to.eq(200);
      // Sprawdź, czy odpowiedź zawiera właściwość 'url'
      expect(response.body).to.have.property("url");
    });
  });

  // Test 2: Sprawdź odpowiedź dla POST na /post z danymi JSON
  it("Test POST na /post z danymi JSON", () => {
    // Wykonaj żądanie POST na /post z danymi JSON
    cy.request("POST", "https://httpbin.org/post", { data: "example" }).should(
      (response) => {
        // Sprawdź, czy status odpowiedzi wynosi 200
        expect(response.status).to.eq(200);
        // Sprawdź, czy odpowiedź zawiera właściwość 'json' z oczekiwanymi danymi
        expect(response.body).to.have.property("json");
        expect(response.body.json).to.deep.eq({ data: "example" });
      }
    );
  });

  // Test 3: Sprawdź nagłówki dla zapytania z niestandardowym User-Agent
  it("Test z niestandardowym User-Agent", () => {
    // Wykonaj żądanie na /user-agent z niestandardowym nagłówkiem User-Agent
    cy.request({
      url: "https://httpbin.org/user-agent",
      headers: { "User-Agent": "Cypress Test" },
    }).should((response) => {
      // Sprawdź, czy status odpowiedzi wynosi 200
      expect(response.status).to.eq(200);
      // Sprawdź, czy odpowiedź zawiera niestandardowy nagłówek 'user-agent'
      expect(response.body).to.have.property("user-agent", "Cypress Test");
    });
  });

  // Test 4: Sprawdź czas trwania wniosku dla GET na /delay/1
  it("Test czasu trwania wniosku dla GET na /delay/1", () => {
    // Wykonaj żądanie GET na /delay/1
    cy.request("https://httpbin.org/delay/1").should((response) => {
      // Sprawdź, czy status odpowiedzi wynosi 200
      expect(response.status).to.eq(200);
      // Sprawdź, czy odpowiedź zawiera właściwość 'url'
      expect(response.body).to.have.property("url");
      // Sprawdź, czy czas trwania wniosku jest mniejszy niż 1500 ms
      expect(response.duration).to.be.lessThan(1500); // Mniej niż 1500 ms
    });
  });

  // Test 5: Sprawdź treść odpowiedzi dla zapytania z parametrem
  it("Test treści odpowiedzi dla GET na /get z parametrem", () => {
    // Wykonaj żądanie GET na /get z parametrem 'param=test'
    cy.request("https://httpbin.org/get?param=test").should((response) => {
      // Sprawdź, czy status odpowiedzi wynosi 200
      expect(response.status).to.eq(200);
      // Sprawdź, czy odpowiedź zawiera właściwość 'args' z oczekiwanym parametrem
      expect(response.body).to.have.property("args");
      expect(response.body.args).to.have.property("param", "test");
    });
  });

  // Test 6: Sprawdź przekazywanie nagłówków zapytania
  it("Test przekazywania nagłówków zapytania", () => {
    // Określ niestandardowe nagłówki i wykonaj żądanie na /headers
    const headers = { "X-Custom-Header": "Custom Value" };
    cy.request({ url: "https://httpbin.org/headers", headers }).should(
      (response) => {
        // Sprawdź, czy status odpowiedzi wynosi 200
        expect(response.status).to.eq(200);
        // Sprawdź, czy odpowiedź zawiera właściwość 'headers' z oczekiwanym niestandardowym nagłówkiem
        expect(response.body).to.have.property("headers");
        expect(response.body.headers).to.have.property(
          "X-Custom-Header",
          "Custom Value"
        );
      }
    );
  });

  // Test 7: Sprawdź obsługę metody PATCH
  it("Test obsługi metody PATCH", () => {
    // Wykonaj żądanie PATCH na /patch z danymi JSON
    cy.request("PATCH", "https://httpbin.org/patch", {
      data: "patch example",
    }).should((response) => {
      // Sprawdź, czy status odpowiedzi wynosi 200
      expect(response.status).to.eq(200);
      // Sprawdź, czy odpowiedź zawiera właściwość 'json' z oczekiwanymi danymi
      expect(response.body).to.have.property("json");
      expect(response.body.json).to.deep.eq({ data: "patch example" });
    });
  });

  // Test 8: Sprawdź obsługę metody PUT
  it("Test obsługi metody PUT", () => {
    // Wykonaj żądanie PUT na /put z danymi JSON
    cy.request("PUT", "https://httpbin.org/put", {
      data: "put example",
    }).should((response) => {
      // Sprawdź, czy status odpowiedzi wynosi 200
      expect(response.status).to.eq(200);
      // Sprawdź, czy odpowiedź zawiera właściwość 'json' z oczekiwanymi danymi
      expect(response.body).to.have.property("json");
      expect(response.body.json).to.deep.eq({ data: "put example" });
    });
  });

  // Test 9: Sprawdź obsługę metody DELETE
  it("Test obsługi metody DELETE", () => {
    // Wykonaj żądanie DELETE na /delete
    cy.request("DELETE", "https://httpbin.org/delete").should((response) => {
      // Sprawdź, czy status odpowiedzi wynosi 200
      expect(response.status).to.eq(200);
      // Sprawdź, czy odpowiedź zawiera właściwość 'url'
      expect(response.body).to.have.property("url");
    });
  });

  // Test 10: Sprawdź obsługę formularzy
  it("Test obsługi formularzy", () => {
    // Przygotuj dane formularza i wykonaj żądanie POST na /post z danymi formularza
    const formData = new FormData();
    formData.append("field", "example");
    cy.request("POST", "https://httpbin.org/post", formData).should(
      (response) => {
        // Sprawdź, czy status odpowiedzi wynosi 200
        expect(response.status).to.eq(200);
        // Sprawdź, czy odpowiedź zawiera właściwość 'form' z oczekiwanymi danymi formularza
        expect(response.body).to.have.property("form");
        expect(response.body.form).to.deep.eq({ field: "example" });
      }
    );
  });

  // Test 11: Sprawdź obsługę nagłówka Accept
  it("Test obsługi nagłówka Accept", () => {
    // Wykonaj żądanie na /headers z niestandardowym nagłówkiem Accept
    cy.request({
      url: "https://httpbin.org/headers",
      headers: { Accept: "application/json" },
    }).should((response) => {
      // Sprawdź, czy status odpowiedzi wynosi 200
      expect(response.status).to.eq(200);
      // Sprawdź, czy odpowiedź zawiera właściwość 'headers' z oczekiwanym niestandardowym nagłówkiem
      expect(response.body).to.have.property("headers");
      expect(response.body.headers).to.have.property(
        "Accept",
        "application/json"
      );
    });
  });

  // Test 12: Sprawdź obsługę nagłówka Content-Type
  it("Test obsługi nagłówka Content-Type", () => {
    // Przygotuj dane JSON i wykonaj żądanie POST na /post z niestandardowym nagłówkiem Content-Type
    const data = { key: "value" };
    cy.request("POST", "https://httpbin.org/post", data, {
      headers: { "Content-Type": "application/json" },
    }).should((response) => {
      // Sprawdź, czy status odpowiedzi wynosi 200
      expect(response.status).to.eq(200);
      // Sprawdź, czy odpowiedź zawiera właściwość 'json' z oczekiwanymi danymi
      expect(response.body).to.have.property("json");
      expect(response.body.json).to.deep.eq(data);
    });
  });
});
