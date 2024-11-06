using AutoMapper;
using ExpenseTracker.API.Models.Domain;
using ExpenseTracker.API.Models.DTO;

namespace ExpenseTracker.API.Mappings
{
    public class AutoMapperProfiles:Profile
    {

        public AutoMapperProfiles()
        {
            CreateMap<Region, RegionDto>().ReverseMap();

            CreateMap<AddRegionRequestDto, Region>().ReverseMap();

            CreateMap<UpdateRegionRequestDto, Region>().ReverseMap();
        }
    }
}
