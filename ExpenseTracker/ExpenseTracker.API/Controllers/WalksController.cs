﻿using AutoMapper;
using ExpenseTracker.API.Models.Domain;
using ExpenseTracker.API.Models.DTO;
using ExpenseTracker.API.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseTracker.API.Controllers
{

    // /api/walks
    [Route("api/[controller]")]
    [ApiController]
    public class WalksController : ControllerBase


    {
        private readonly IMapper mapper;
        private readonly IWalkRepository walkRepository;

        public WalksController(IMapper mapper, IWalkRepository walkRepository)
        {
            this.mapper = mapper;
            this.walkRepository = walkRepository;
        }

        // CREATE WALK
        //POST: /api/walks
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddWalkRequestDto addWalkRequestDto)
        {
            //map dto to domain

            var walkDomainModel = mapper.Map<Walk>(addWalkRequestDto);

            await walkRepository.CreateAsync(walkDomainModel);


            // domain to dto


            return Ok(mapper.Map<WalkDto>(walkDomainModel));
        }

        //GET
        //Read

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var walksDomainModel = await walkRepository.GetAllAsync();

            //map domain to dto

            return Ok(mapper.Map<List<WalkDto>>(walksDomainModel));
        }

        // get by id

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var walkDomainModel = await walkRepository.GetByIdAsync(id);

            if(walkDomainModel == null)
            {
                return NotFound();
            }

            // domain to dto

            return Ok(mapper.Map<WalkDto>(walkDomainModel));
        }

        //update

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Update([FromRoute] Guid id,)
        {

        }
    }
}