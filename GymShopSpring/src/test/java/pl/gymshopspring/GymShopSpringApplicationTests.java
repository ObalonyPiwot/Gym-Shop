package pl.gymshopspring;

import lombok.SneakyThrows;
import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
class GymShopSpringApplicationTests {
	@Autowired
	Controller controller = new Controller();
	@Autowired
	UserIntefaceController userController = new UserIntefaceController();
	@SneakyThrows
	@Test
	public void testSelectCategories(){

		controller.jdbc.update("DELETE FROM KATEGORIE");
		controller.jdbc.update("INSERT INTO KATEGORIE (ID, NAZWA) VALUES ('0', 'Test1')");

		ResponseEntity<String> response = controller.selectCategories();
		String responseBody = response.getBody();
		JSONObject jsonResponse = new JSONObject(responseBody);
		JSONArray kategorieArray = jsonResponse.getJSONArray("Kategorie");
		List<Kategoria> kategorie = new ArrayList<>();
		for (int i = 0; i < kategorieArray.length(); i++) {
			JSONObject kategoriaJson = kategorieArray.getJSONObject(i);
			int id = kategoriaJson.getInt("id");
			String nazwa = kategoriaJson.getString("nazwa");
			Kategoria kategoria = new Kategoria(id, nazwa);
			kategorie.add(kategoria);
		}
		Assertions.assertEquals(1, kategorie.size(), "Niepoprawna liczba kategorii.");

		String categoryName1 = (String) kategorie.get(0).getNazwa();

		Assertions.assertEquals("Test1", categoryName1, "Niepoprawna nazwa kategorii.");
		controller.jdbc.update("DELETE FROM grupy");
		controller.jdbc.update("DELETE FROM KATEGORIE");
	}

	@SneakyThrows
	@Test
	public void testSelectUser(){

		controller.jdbc.update("DELETE FROM UZYTKOWNIK");
		controller.jdbc.update("INSERT INTO uzytkownik VALUES (UzytkownikID.nextVal, 'Logan', 'Carta', 'Uzytkownik', '6ffcfcc7'," +
				" 'nuebi@titunir.kp', '155038985')");

		ResponseEntity<String> response = userController.login("nuebi@titunir.kp","6ffcfcc7");
		String responseBody = response.getBody();
		JSONObject jsonResponse = new JSONObject(responseBody);
		JSONObject userJson = jsonResponse.getJSONObject("User");
		Long id = userJson.getLong("id");
		String imie= userJson.getString("imie");
		String nazwisko= userJson.getString("nazwisko");
		String typKonta= userJson.getString("typKonta");
		String haslo= userJson.getString("haslo");
		String email= userJson.getString("email");
		String telefon= userJson.getString("telefon");
		Uzytkownik user = new Uzytkownik(id,imie,nazwisko,typKonta,haslo,email,telefon);

		Assertions.assertEquals("Logan", imie, "Błąd imie.");
		Assertions.assertEquals("Carta", nazwisko, "Błąd nazwisko.");
		Assertions.assertEquals("Uzytkownik", typKonta, "Błąd typKonta.");
		Assertions.assertEquals("6ffcfcc7", haslo, "Błąd haslo.");
		Assertions.assertEquals("nuebi@titunir.kp", email, "Błąd email.");
		Assertions.assertEquals("155038985", telefon, "Błąd telefon.");
		controller.jdbc.update("DELETE FROM UZYTKOWNIK");
	}
	@SneakyThrows
	@Test
	public void testselectProducts(){

		controller.jdbc.update("DELETE FROM Produkty");
		controller.jdbc.update("INSERT INTO produkty(ID, NAZWA, OPIS, ZDJECIE, CENA, dataDodania, IDGRUPY) " +
				"VALUES(PRODUKTYID.nextVal, 'test3','test3','test3_2023-06-11_EGR58.png',23.23, SYSDATE,'1')");

		ResponseEntity<String> response = controller.selectProducts();;
		JSONObject jsonResponse = new JSONObject(response.getBody());
		JSONArray userJsonArray = jsonResponse.getJSONArray("Produkty");
		JSONObject userJson = userJsonArray.getJSONObject(0);
		int id = userJson.getInt("id");
		String nazwa= userJson.getString("nazwa");
		String opis= userJson.getString("opis");
		String zdjecie= userJson.getString("zdjecie");
		double cena= userJson.getDouble("cena");
		double ocena= userJson.getDouble("ocena");
		int idGrupy= userJson.getInt("idGrupy");
		int isActive= userJson.getInt("isActive");
		int onPromotion= userJson.getInt("onPromotion");

		Assertions.assertEquals("test3", nazwa, "Błąd nazwa.");
		Assertions.assertEquals("test3", opis, "Błąd opis.");
		Assertions.assertEquals("test3_2023-06-11_EGR58.png", zdjecie, "Błąd zdjecie.");
		Assertions.assertEquals(23.23, cena, "Błąd cena.");
		Assertions.assertEquals(0.0, ocena, "Błąd ocena.");
		Assertions.assertEquals(1, idGrupy, "Błąd idGrupy.");
		Assertions.assertEquals(1, isActive, "Błąd isActive.");
		Assertions.assertEquals(0, onPromotion, "Błąd onPromotion.");
		controller.jdbc.update("DELETE FROM Produkty");
	}
	@SneakyThrows
	@Test
	public void testselectProductsOnSale(){

		controller.jdbc.update("DELETE FROM Produkty");
		controller.jdbc.update("INSERT INTO produkty(ID, NAZWA, OPIS, ZDJECIE, CENA, dataDodania, IDGRUPY) " +
				"VALUES(1, 'test3','test3','test3_2023-06-11_EGR58.png',23.23, SYSDATE,'1')");
		controller.updateProduct("1","10","1");
		ResponseEntity<String> response = controller.selectProductsForSale();;
		JSONObject jsonResponse = new JSONObject(response.getBody());
		JSONArray userJsonArray = jsonResponse.getJSONArray("Produkty");
		JSONObject userJson = userJsonArray.getJSONObject(0);
		int id = userJson.getInt("id");
		String nazwa= userJson.getString("nazwa");
		String opis= userJson.getString("opis");
		String zdjecie= userJson.getString("zdjecie");
		double cena= userJson.getDouble("cena");
		double ocena= userJson.getDouble("ocena");
		int idGrupy= userJson.getInt("idGrupy");
		int isActive= userJson.getInt("isActive");
		int onPromotion= userJson.getInt("onPromotion");

		Assertions.assertEquals("test3", nazwa, "Błąd nazwa.");
		Assertions.assertEquals("test3", opis, "Błąd opis.");
		Assertions.assertEquals("test3_2023-06-11_EGR58.png", zdjecie, "Błąd zdjecie.");
		Assertions.assertEquals(10, cena, "Błąd cena.");
		Assertions.assertEquals(0.0, ocena, "Błąd ocena.");
		Assertions.assertEquals(1, idGrupy, "Błąd idGrupy.");
		Assertions.assertEquals(1, isActive, "Błąd isActive.");
		Assertions.assertEquals(1, onPromotion, "Błąd onPromotion.");
		controller.jdbc.update("DELETE FROM Produkty");
	}
	@SneakyThrows
	@Test
	public void testdeleteProducts(){

		controller.jdbc.update("DELETE FROM Produkty");
		controller.jdbc.update("INSERT INTO produkty(ID, NAZWA, OPIS, ZDJECIE, CENA, dataDodania, IDGRUPY) " +
				"VALUES(1, 'test3','test3','test3_2023-06-11_EGR58.png',23.23, SYSDATE,'1')");
		controller.deleteProductAdmin("1");
		ResponseEntity<String> response = controller.selectProducts();
		JSONObject jsonResponse = new JSONObject(response.getBody());
		JSONArray prodJsonArray = jsonResponse.getJSONArray("Produkty");

		Assertions.assertEquals(0, prodJsonArray.length(), "Błąd ilosc peoduktow.");

		controller.jdbc.update("DELETE FROM Produkty");
	}
	@SneakyThrows
	@Test
	public void testuserFirmGym(){

		controller.jdbc.update("DELETE FROM Uzytkownik");
		controller.jdbc.update("INSERT INTO uzytkownik VALUES (1, 'Logan', 'Carta', 'Uzytkownik', '6ffcfcc7'," +
				" 'nuebi@titunir.kp', '155038985')");
		controller.jdbc.update("DELETE FROM Firmy");
		controller.insertFirm("1","Nazwa","111111111");
		controller.jdbc.update("DELETE FROM SILOWNIE");
		String response = controller.selectUserFirm("1");
		JSONObject jsonResponse = new JSONObject(response);
		JSONArray fimJson = jsonResponse.getJSONArray("Firmy");
		Assertions.assertEquals(1, fimJson.length(), "Błąd ilosc firm.");
		JSONObject firma = fimJson.getJSONObject(0);
		int idUzyt= firma.getInt("idUzyt");
		String nazwa= firma.getString("nazwa");
		String telefon= firma.getString("telefon");

		Assertions.assertEquals(1, idUzyt, "Błąd idUzyt.");
		Assertions.assertEquals("Nazwa", nazwa, "Błąd nazwa.");
		Assertions.assertEquals("111111111", telefon, "Błąd telefon.");

		controller.insertUserGym("1","Gym",";)","123412312");
		String response2 = controller.selectUserGyms("1");
		JSONObject jsonResponse2 = new JSONObject(response2);
		JSONArray silJson = jsonResponse2.getJSONArray("Silownie");
		Assertions.assertEquals(1, silJson.length(), "Błąd ilosc silowni.");
		JSONObject sil = silJson.getJSONObject(0);
		Assertions.assertEquals(1, sil.getInt("idFirmy"), "Błąd idFirmy.");
		Assertions.assertEquals(";)", sil.getString("adres"), "Błąd adres.");
		Assertions.assertEquals("Gym", sil.getString("nazwa"), "Błąd nazwa.");
		Assertions.assertEquals("123412312", sil.getString("telefon"), "Błąd telefon.");
		controller.jdbc.update("DELETE FROM UZYTKOWNIK");
		controller.jdbc.update("DELETE FROM Firmy");
		controller.jdbc.update("DELETE FROM SILOWNIE");
	}
}
