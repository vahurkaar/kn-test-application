package ee.dolmit

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType.IDENTITY
import javax.persistence.Id

@Entity
data class Person(
    @Id
    @GeneratedValue(strategy = IDENTITY)
    val id: Long,

    @Column
    val name: String,

    @Column(nullable = true)
    val suffix: String?,

    @Column
    val url: String
)