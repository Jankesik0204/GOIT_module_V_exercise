describe("Testy dla API https://httpbin.org/", () => {
  // Test 1: Sprawdź odpowiedź dla GET na /get
  it("Test GET na /get", () => {
    // Wykonaj żądanie GET na /get
    cy.request("https://httpbin.org/get").should((response) => {
      // Sprawdź, czy status odpowiedzi wynosi 200
      expect(response.status).to.eq(200);
      // Sprawdź, czy odpowiedź zawiera właściwość 'url'
      expect(response.body).to.have.property("url");
      // Sprawdź, czy odpowiedź (response) zawiera właściwość 'headers'
      expect(response.body).to.have.property("headers");
    });
  });

  // Test 2A: Sprawdź odpowiedź dla POST na /post z danymi JSON (pozytywne)
  it("Test POST na /post z danymi JSON", () => {
    cy.request("POST", "https://httpbin.org/post", { data: "example" }).should(
      (response) => {
        // Sprawdź, czy status odpowiedzi wynosi 200
        expect(response.status).to.eq(200);
        // Sprawdź, czy odpowiedź zawiera właściwość 'json' z oczekiwanymi danymi
        expect(response.body).to.have.property("json");
        expect(response.body.json).to.deep.eq({ data: "example" });
        expect(response.body.json).to.deep.eq({ data: "example_2" });
      }
    );
  });

  // Test 2: Sprawdź odpowiedź dla POST na /post z danymi JSON(negatywne)
  it("Test POST na /post z danymi JSON", () => {
    cy.request("POST", "https://httpbin.org/post", { data: "example" }).should(
      (response) => {
        expect(response.status).to.eq(200);
        // Sprawdza, czy odpowiedź zawiera właściwość 'json' z oczekiwanymi danymi
        expect(response.body).to.have.property("json");
        expect(response.body.json).to.deep.eq({ data: "example_2" });
      }
    );
  });

  // Test 3A: Sprawdź nagłówki dla zapytania z niestandardowym User-Agent (pozytywny)
  it("Test z niestandardowym User-Agent", () => {
    // Wykonaj żądanie na /user-agent z niestandardowym nagłówkiem User-Agent
    cy.request({
      url: "https://httpbin.org/user-agent",
      headers: { "User-Agent": "Cypress Test" },
    }).should((response) => {
      expect(response.status).to.eq(200);
      // Sprawdza, czy odpowiedź zawiera niestandardowy nagłówek 'user-agent'
      expect(response.body).to.have.property("user-agent", "Cypress Test");
    });
  });

  // Test 3B: Sprawdź nagłówki dla zapytania z niestandardowym User-Agent(negatywnie)
  it("Test z niestandardowym User-Agent", () => {
    // Wykonaj żądanie na /user-agent z niestandardowym nagłówkiem User-Agent
    cy.request({
      url: "https://httpbin.org/user-agent",
      headers: { "User-Agent": "Cypress Test" },
    }).should((response) => {
      expect(response.status).to.eq(200);
      // Sprawdza, czy odpowiedź zawiera niestandardowy nagłówek 'user-agent'
      expect(response.body).to.have.property("user-agent", "Cypress_X_Test");
    });
  });

  // Test 4A: Sprawdź czas trwania wniosku dla GET na /delay/1 (pozytywny)
  it("Test czasu trwania wniosku dla GET na /delay/1", () => {
    cy.request("https://httpbin.org/delay/1").should((response) => {
      expect(response.status).to.eq(200);
      // Sprawdź, czy odpowiedź zawiera właściwość 'origin'
      expect(response.body).to.have.property("origin");
      // Sprawdź, czy czas trwania wniosku jest mniejszy niż 1500 ms
      expect(response.duration).to.be.lessThan(1500); // Sprawdza czy odpowiedź trwa mniej niż 1500 ms
    });
  });

  // Test 4B: Sprawdź czas trwania wniosku dla GET na /delay/1 (negatywny)
  it("Test czasu trwania wniosku dla GET na /delay/1", () => {
    cy.request("https://httpbin.org/delay/1").should((response) => {
      expect(response.status).to.eq(200);
      // Sprawdź, czy odpowiedź zawiera właściwość 'origin'
      expect(response.body).to.have.property("origin");
      // Sprawdź, czy czas trwania wniosku jest mniejszy niż 1500 ms
      expect(response.duration).to.be.lessThan(120); // Sprawdza czy odpowiedź trwa mniej niż 120 ms
    });
  });

  // Test 5: Sprawdź treść odpowiedzi dla zapytania z parametrem
  it("Test treści odpowiedzi dla GET na /get z parametrem", () => {
    cy.request("https://httpbin.org/get?param=test").should((response) => {
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
    cy.request({
      url: "https://httpbin.org/headers",
      headers,
    }).should((response) => {
      // Sprawdź, czy status odpowiedzi wynosi 200
      expect(response.status).to.eq(200);
      // Sprawdź, czy odpowiedź zawiera właściwość 'headers' z oczekiwanym niestandardowym nagłówkiem
      expect(response.body).to.have.property("headers");
      expect(response.body.headers).to.have.property(
        "X-Custom-Header",
        "Custom Value"
      );
    });
  });
});
