package ssafy.modo.jamkkaebi.common.config;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.autoconfigure.mongo.MongoProperties;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateProperties;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateSettings;
import org.springframework.boot.autoconfigure.orm.jpa.JpaProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.*;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;
import java.util.Map;
import java.util.Objects;

@Slf4j
@Configuration
@EnableJpaRepositories(basePackages = "ssafy.modo.jamkkaebi",
        excludeFilters = @ComponentScan.Filter(
                type = FilterType.ASSIGNABLE_TYPE,
                classes = {
                        MongoRepository.class
                }
        ))
@EnableMongoRepositories(basePackages = "ssafy.modo.jamkkaebi",
        includeFilters = @ComponentScan.Filter(
                type = FilterType.ASSIGNABLE_TYPE,
                classes = {
                        MongoRepository.class
                }
        ))
@EnableConfigurationProperties({
        DataSourceProperties.class, MongoProperties.class, HibernateProperties.class
})
public class DatabaseConfig {

    private final HibernateProperties hibernateProperties;
    private final JpaProperties jpaProperties;

    public DatabaseConfig(HibernateProperties hibernateProperties, JpaProperties jpaProperties) {
        this.hibernateProperties = hibernateProperties;
        this.jpaProperties = jpaProperties;
    }

    @Primary
    @Bean
    @ConfigurationProperties(prefix = "spring.datasource")
    public DataSourceProperties mySqlProperties() {
        return new DataSourceProperties();
    }

    @Primary
    @Bean
    public DataSource mySqlSource(DataSourceProperties mySqlProperties) {
        return mySqlProperties.initializeDataSourceBuilder()
                .driverClassName(mySqlProperties.getDriverClassName())
                .url(mySqlProperties.getUrl())
                .username(mySqlProperties.getUsername())
                .password(mySqlProperties.getPassword())
                .build();
    }

    @Primary
    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(
            EntityManagerFactoryBuilder builder, DataSource dataSource) {

        Map<String, Object> properties = hibernateProperties.determineHibernateProperties(
                jpaProperties.getProperties(), new HibernateSettings());

        log.info("Hibernate Properties: {}", properties);

        return builder.dataSource(dataSource)
                .packages("ssafy.modo.jamkkaebi")
                .persistenceUnit("MySQL")
                .properties(properties)
                .build();
    }

    @Primary
    @Bean
    public PlatformTransactionManager transactionManager(
            LocalContainerEntityManagerFactoryBean entityManagerFactory) {
        return new JpaTransactionManager(Objects.requireNonNull(entityManagerFactory.getObject()));
    }

    @Bean
    public MongoClient mongoClient(MongoProperties mongoProperties) {

        String connectionString = String.format(
                "mongodb://%s:%s@%s:%d/%s?authSource=%s",
                mongoProperties.getUsername(),
                String.valueOf(mongoProperties.getPassword()),
                mongoProperties.getHost(),
                mongoProperties.getPort(),
                mongoProperties.getDatabase(),
                mongoProperties.getAuthenticationDatabase()
        );

        return MongoClients.create(MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString(connectionString))
                .build());
    }

    @Bean
    public MongoTemplate mongoTemplate(MongoClient mongoClient, MongoProperties mongoProperties) {
        return new MongoTemplate(mongoClient, mongoProperties.getDatabase());
    }
}
