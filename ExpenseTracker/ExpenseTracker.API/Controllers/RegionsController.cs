using ExpenseTracker.API.Data;
using ExpenseTracker.API.Models.Domain;
using ExpenseTracker.API.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseTracker.API.Controllers
{
    //https://localhost:portnumber/api/regions
    [Route("api/[controller]")]
    [ApiController]
    public class RegionsController : ControllerBase
    {
        private readonly ExpenseTrackerDbContext dbContext;

        public RegionsController(ExpenseTrackerDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        //Get All Regions
        [HttpGet]
        public IActionResult GetAll()
        {
            // get data from database - domain models
            var regions = dbContext.Regions.ToList();

            // map domain models to DTOs

            var regionsDto = new List<RegionDto>();
            foreach (var region in regions)
            {
                regionsDto.Add(new RegionDto()
                {
                    Id = region.Id,
                    Code = region.Code,
                    Name = region.Name,
                    RegionImageUrl = region.RegionImageUrl
                });
            }

            // return DTOs

            return Ok(regionsDto);
        }

        //GET SINGLE REGION (get region by ID)
        //https://localhost:portnumber/api/regions/{id}
        [HttpGet]
        [Route("{id:Guid}")]
        public IActionResult GetById([FromRoute]Guid id)
        {
            // var region = dbContext.Regions.Find(id);
            // domain model
           var region = dbContext.Regions.FirstOrDefault(x => x.Id == id);



            if(region == null)
            {
                return NotFound();
            }

            //convert/map domain model to dto

            var regionDto = new RegionDto
            {
                Id = region.Id,
                Code = region.Code,
                Name = region.Name,
                RegionImageUrl = region.RegionImageUrl

            };
            return Ok(regionDto);
        }

        // POST Create New Region

        [HttpPost]
        public IActionResult Create([FromBody] AddRegionRequestDto addRegionRequestDto)
        {
            //map dto to domain model

            var regionDomainModel = new Region
            {
                Code = addRegionRequestDto.Code,
                Name = addRegionRequestDto.Name,
                RegionImageUrl = addRegionRequestDto.RegionImageUrl
            };


            //use domain model to create region

            dbContext.Regions.Add(regionDomainModel);
            dbContext.SaveChanges();

            // map dm back to dto
            var regionDto = new RegionDto
            {
                Id = regionDomainModel.Id,
                Code = regionDomainModel.Code,
                Name = regionDomainModel.Name,
                RegionImageUrl = regionDomainModel.RegionImageUrl
            };

            return CreatedAtAction(nameof(GetById), new { id = regionDomainModel.Id }, regionDomainModel);
        }

        // update PUT
        // PUT: https://localhost:portnumber/api/regions/{id}

        [HttpPut]
        [Route("{id:Guid}")]
        public IActionResult Update([FromRoute] Guid id, [FromBody] UpdateRegionRequestDto updateRegionRequestDto )
        {
            var regionDomainModel = dbContext.Regions.FirstOrDefault(x => x.Id == id);
            
            if(regionDomainModel == null)
            {
                return NotFound();
            }

            // dto to dm

            
            regionDomainModel.Code = updateRegionRequestDto.Code;
            regionDomainModel.Name = updateRegionRequestDto.Name;
            regionDomainModel.RegionImageUrl = updateRegionRequestDto.RegionImageUrl;

            dbContext.SaveChanges();


            // DM TO DTO

            var regionDto = new RegionDto
            {
                Id = regionDomainModel.Id,
                Code = regionDomainModel.Code,
                Name = regionDomainModel.Name,
                RegionImageUrl = regionDomainModel.RegionImageUrl
            };
            return Ok(regionDto);
        
        }

        // DELETE : HTTPS://LOCALHOST:PORTNUMBER/API/REGIONS/{ID}


        [HttpDelete]
        [Route("{id:Guid}")]
        public IActionResult Delete([FromRoute] Guid id)
        {
            var regionDomainModel = dbContext.Regions.FirstOrDefault(x => x.Id == id);
            
            if(regionDomainModel == null)
            {
                return NotFound();
            }

            //delete region

            dbContext.Regions.Remove(regionDomainModel);
            dbContext.SaveChanges();

            //return deleted region

            // map dm to dto

            var regionDto = new RegionDto
            {
                Id = regionDomainModel.Id,
                Code = regionDomainModel.Code,
                Name = regionDomainModel.Name,
                RegionImageUrl = regionDomainModel.RegionImageUrl
            };

            return Ok(regionDto);
        
        
        }


    }
}
