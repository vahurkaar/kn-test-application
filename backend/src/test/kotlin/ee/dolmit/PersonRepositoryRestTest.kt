package ee.dolmit

import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.core.io.ClassPathResource
import org.springframework.test.context.junit.jupiter.SpringExtension
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@ExtendWith(SpringExtension::class)
@SpringBootTest
@AutoConfigureMockMvc
class PersonRepositoryRestTest {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @DisplayName("GET - findByName")
    @Nested
    inner class FindByName {
        @Test
        fun `should get default list of people when name is empty`() {
            mockMvc.perform(get("/people/search/findByName?name="))
                .andExpect(status().isOk)
                .andExpect(content().contentType("application/hal+json"))
                .andExpect(content().json(from("initialPersonsResponse.json")))
        }

        @Test
        fun `should get second page of people when name is empty`() {
            mockMvc.perform(get("/people/search/findByName?name=&page=1"))
                .andExpect(status().isOk)
                .andExpect(content().contentType("application/hal+json"))
                .andExpect(content().json(from("secondPersonsPageResponse.json")))
        }

        @Test
        fun `should get last page of people when name is empty`() {
            mockMvc.perform(get("/people/search/findByName?name=&page=40"))
                .andExpect(status().isOk)
                .andExpect(content().contentType("application/hal+json"))
                .andExpect(content().json(from("lastPersonsPageResponse.json")))
        }

        @Test
        fun `should get overflowed page of people`() {
            mockMvc.perform(get("/people/search/findByName?name=&page=1000"))
                .andExpect(status().isOk)
                .andExpect(content().contentType("application/hal+json"))
                .andExpect(content().json(from("overflowedPersonsPageResponse.json")))
        }

        @Test
        fun `should return empty result by default`() {
            mockMvc.perform(get("/people/search/findByName"))
                .andExpect(status().isOk)
                .andExpect(content().contentType("application/hal+json"))
                .andExpect(content().json(from("findByNamePersonsNoResultsResponse.json")))
        }

        @Test
        fun `should return people with name`() {
            mockMvc.perform(get("/people/search/findByName?name=Homer"))
                .andExpect(status().isOk)
                .andExpect(content().contentType("application/hal+json"))
                .andExpect(content().json(from("findByNamePersonsResponse.json")))
        }

        @Test
        fun `should return first page of people with name`() {
            mockMvc.perform(get("/people/search/findByName?name=Homer&page=0&size=1"))
                .andExpect(status().isOk)
                .andExpect(content().contentType("application/hal+json"))
                .andExpect(content().json(from("findByNamePersonsFirstPageResponse.json")))
        }
    }

    private fun from(fileName: String) = ClassPathResource(fileName).file.readText()
}