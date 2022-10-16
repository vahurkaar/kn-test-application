package ee.dolmit

import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.repository.query.Param
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.data.rest.core.annotation.RestResource

@RepositoryRestResource(collectionResourceRel = "people", path = "people")
internal interface PersonRepository : PagingAndSortingRepository<Person, Long> {
    @RestResource(path = "findByName", rel = "find-by-name")
    fun findByNameIgnoreCaseContaining(@Param("name") name: String?, pageable: Pageable): Page<Person>
}