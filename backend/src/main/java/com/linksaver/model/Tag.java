package com.linksaver.model;

import jakarta.persistence.*;
import java.util.Set;

@Entity
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @ManyToMany(mappedBy = "tags")
    private Set<Link> links;

    // getters and setters
}
