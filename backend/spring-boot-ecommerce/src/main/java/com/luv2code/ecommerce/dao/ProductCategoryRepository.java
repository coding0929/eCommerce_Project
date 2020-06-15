package com.luv2code.ecommerce.dao;

import com.luv2code.ecommerce.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")  //angular port
@RepositoryRestResource(collectionResourceRel = "productCategory", path="product-category") //collectionResourceRel: name of JSON entry, path:/product-category
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
}
